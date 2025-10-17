/**
 * Child class CAPS_ChannelAPIUtility extending ChannelAPIBaseUtility.
 * This class overrides convertResponse to include an additional private method call (getAnnuity).
 * It also overrides method1, method2, and method3 with custom debug statements for testing.
 * Demonstrates overriding virtual methods while reusing some base logic via super calls if needed.
 * Note: Private methods (method4 and method5) from base are still called and cannot be overridden.
 * Additional private method getAnnuity is specific to this class only.
 * Best practices:
 * - Overrides virtual methods appropriately.
 * - Uses super.convertResponse() if wanting to extend base behavior, but here we fully override for custom flow.
 * - Encapsulates class-specific logic in private methods.
 * - Custom debug statements to illustrate overrides in action.
 */
public class CAPS_ChannelAPIUtility extends ChannelAPIBaseUtility {

    /**
     * Override of convertResponse.
     * Custom implementation: Calls overridden method1-3, base's private method4-5, and additional getAnnuity.
     * Note: Since method4 and method5 are private in base, we call them directly (they are accessible via inheritance).
     * For demonstration, we manually call all methods instead of super.convertResponse() to show full control.
     */
    public override void convertResponse() {
        System.debug('CAPS: Starting overridden convertResponse');
        super.convertResponse(); // Call base implementation if needed
        getAnnuity();  // Class-specific private
        System.debug('CAPS: Ending overridden convertResponse');
    }

    /**
     * Override of method1 with custom debug.
     */
    protected override void method1() {
        System.debug('CAPS: Overridden method1 with custom logic');
    }

    /**
     * Override of method2 with custom debug.
     */
    protected override void method2() {
        System.debug('CAPS: Overridden method2 with custom logic');
    }

    /**
     * Override of method3 with custom debug.
     */
    protected override void method3() {
        System.debug('CAPS: Overridden method3 with custom logic');
    }

    /**
     * Private method specific to this class, called from overridden convertResponse.
     * Demonstrates encapsulation of child-specific logic.
     */
    private void getAnnuity() {
        System.debug('CAPS: Executing private getAnnuity (class-specific)');
    }
}