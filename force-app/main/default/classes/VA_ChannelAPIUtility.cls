/**
 * VA-specific utility extending ChannelAPIBaseUtility.
 * Safely parses VA policy JSON where attributes may be missing, preventing null dereference.
 * Provides:
 *  - parseVaResponse(String): returns a strongly-typed DTO with safe defaults.
 *  - getLastWarnings(): non-fatal parsing warnings for missing/invalid attributes.
 *  - Overrides of method1-3 to demonstrate extensible processing stages.
 *
 * Design choices:
 *  - Strongly-typed DTOs over Map for compile-time safety.
 *  - Defensive getters that never throw on missing keys, aggregate warnings instead.
 *  - Only throw on fully malformed JSON payloads (non-JSON or non-object root).
 */
public class VA_ChannelAPIUtility extends ChannelAPIBaseUtility {

    // Accumulates warnings during the last parse operation
    private List<String> warnings = new List<String>();

    /**
     * Public API: Parse a VA policy JSON string into a DTO with null-safe defaults.
     * Returns VaPolicyResponse even when parts of the payload are missing.
     */
    public VaPolicyResponse parseVaResponse(String jsonString) {
        warnings.clear();
        System.debug('[VA] Starting parseVaResponse');

        if (String.isBlank(jsonString)) {
            warnings.add('Empty JSON input');
            System.debug('[VA] Warning: Empty JSON input');
            // Return empty DTO with defaults
            return new VaPolicyResponse();
        }

        Object root;
        try {
            root = JSON.deserializeUntyped(jsonString);
        } catch (Exception e) {
            System.debug(LoggingLevel.ERROR, '[VA] Malformed JSON: ' + e.getMessage());
            // Consider malformed JSON as critical
            throw new AuraHandledException('Malformed JSON provided to VA parser: ' + e.getMessage());
        }

        if (!(root instanceof Map<String, Object>)) {
            System.debug(LoggingLevel.ERROR, '[VA] Root JSON is not an object');
            throw new AuraHandledException('Invalid JSON: root is not an object');
        }

        Map<String, Object> rootMap = (Map<String, Object>) root;

        VaPolicyResponse dto = new VaPolicyResponse();
        // Extract top-level fields (examples; adjust/add as VA schema evolves)
        dto.policyNumber = getString(rootMap, 'policyNumber');
        dto.policyStatus = getString(rootMap, 'policyStatus');
        dto.effectiveDate = getDate(rootMap, 'effectiveDate');

        // Nested object: insured
        Map<String, Object> insuredMap = getObject(rootMap, 'insured');
        if (insuredMap != null) {
            dto.insured = new Insured();
            dto.insured.name = getString(insuredMap, 'name');
            dto.insured.dob = getDate(insuredMap, 'dob');
        }

        // List: coverages
        List<Object> coverages = getList(rootMap, 'coverages');
        if (coverages != null) {
            for (Object o : coverages) {
                if (o instanceof Map<String, Object>) {
                    Map<String, Object> cov = (Map<String, Object>) o;
                    Coverage c = new Coverage();
                    c.type = getString(cov, 'type');
                    c.amount = getDecimal(cov, 'amount');
                    dto.coverages.add(c);
                } else {
                    warnings.add('Unexpected coverage entry type (not an object)');
                    System.debug('[VA] Warning: Unexpected coverage entry type');
                }
            }
        }

        System.debug('[VA] Completed parseVaResponse with ' + warnings.size() + ' warning(s)');
        return dto;
    }

    /**
     * Retrieve non-fatal warnings from the last parse operation.
     */
    public List<String> getLastWarnings() {
        // deepClone() with flags is only for sObject lists; for List<String>, use a copy constructor
        return new List<String>(warnings);
    }

    // Optionally override base orchestration methods to plug in additional steps
    protected override void method1() {
        System.debug('[VA] method1 - validation step (placeholder)');
    }

    protected override void method2() {
        System.debug('[VA] method2 - normalization step (placeholder)');
    }

    protected override void method3() {
        System.debug('[VA] method3 - enrichment step (placeholder)');
    }

    // --------------------------
    // Defensive getters
    // --------------------------
    private String getString(Map<String, Object> m, String key) {
        if (m == null) {
            warnings.add('Attempted getString on null map for key: ' + key);
            return null;
        }
        if (!m.containsKey(key) || m.get(key) == null) {
            warnings.add('Missing string attribute: ' + key);
            return null;
        }
        Object v = m.get(key);
        if (v instanceof String) {
            return (String) v;
        }
        // Non-string convertible value
        warnings.add('Non-string value for key: ' + key);
        return String.valueOf(v);
    }

    private Date getDate(Map<String, Object> m, String key) {
        if (m == null) {
            warnings.add('Attempted getDate on null map for key: ' + key);
            return null;
        }
        if (!m.containsKey(key) || m.get(key) == null) {
            warnings.add('Missing date attribute: ' + key);
            return null;
        }
        Object v = m.get(key);
        try {
            if (v instanceof String) {
                return Date.valueOf((String) v);
            }
            warnings.add('Non-string value for date key: ' + key);
            return null;
        } catch (Exception ex) {
            warnings.add('Invalid date format for key: ' + key);
            return null;
        }
    }

    private Decimal getDecimal(Map<String, Object> m, String key) {
        if (m == null) {
            warnings.add('Attempted getDecimal on null map for key: ' + key);
            return null;
        }
        if (!m.containsKey(key) || m.get(key) == null) {
            warnings.add('Missing decimal attribute: ' + key);
            return null;
        }
        Object v = m.get(key);
        try {
            if (v instanceof Decimal) {
                return (Decimal) v;
            } else if (v instanceof Integer) {
                return Decimal.valueOf((Integer) v);
            } else if (v instanceof Long) {
                return Decimal.valueOf((Long) v);
            } else if (v instanceof Double) {
                return Decimal.valueOf((Double) v);
            } else if (v instanceof String) {
                return Decimal.valueOf((String) v);
            }
            warnings.add('Non-numeric value for key: ' + key);
            return null;
        } catch (Exception ex) {
            warnings.add('Invalid decimal format for key: ' + key);
            return null;
        }
    }

    private Map<String, Object> getObject(Map<String, Object> m, String key) {
        if (m == null) {
            warnings.add('Attempted getObject on null map for key: ' + key);
            return null;
        }
        if (!m.containsKey(key) || m.get(key) == null) {
            // Missing object is common; not always a warning
            warnings.add('Missing object attribute: ' + key);
            return null;
        }
        Object v = m.get(key);
        if (v instanceof Map<String, Object>) {
            return (Map<String, Object>) v;
        }
        warnings.add('Non-object value for key: ' + key);
        return null;
    }

    private List<Object> getList(Map<String, Object> m, String key) {
        if (m == null) {
            warnings.add('Attempted getList on null map for key: ' + key);
            return null;
        }
        if (!m.containsKey(key) || m.get(key) == null) {
            // Missing list is acceptable; note as a warning for visibility
            warnings.add('Missing list attribute: ' + key);
            return null;
        }
        Object v = m.get(key);
        if (v instanceof List<Object>) {
            return (List<Object>) v;
        }
        warnings.add('Non-list value for key: ' + key);
        return null;
    }

    // --------------------------
    // DTOs
    // --------------------------
    public class VaPolicyResponse {
        public String policyNumber { get; set; }
        public String policyStatus { get; set; }
        public Date effectiveDate { get; set; }
        public Insured insured { get; set; }
        public List<Coverage> coverages { get; set; }

        public VaPolicyResponse() {
            // Initialize safe defaults
            this.policyNumber = null;
            this.policyStatus = null;
            this.effectiveDate = null;
            this.insured = null;
            this.coverages = new List<Coverage>();
        }
    }

    public class Insured {
        public String name { get; set; }
        public Date dob { get; set; }
    }

    public class Coverage {
        public String type { get; set; }
        public Decimal amount { get; set; }
    }
}
