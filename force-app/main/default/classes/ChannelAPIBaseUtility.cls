/**
 * Virtual base class demonstrating inheritance in Apex.
 * This class provides a foundation for API utility classes, with virtual methods that can be overridden
 * by child classes and private methods that are shared and not overrideable.
 * Best practices followed:
 * - Use of virtual keyword for extensible methods.
 * - Private methods for encapsulation of common logic.
 * - Meaningful comments for clarity and learning.
 * - Virtual class to allow extension without instantiation if needed.
 */
public virtual class ChannelAPIBaseUtility {

    /**
     * Virtual method that can be overridden by child classes.
     * This is the entry point method that orchestrates the flow by calling the 5 sub-methods.
     * In the base implementation, it calls method1 through method5 in sequence.
     * Child classes can override this to customize the entire response conversion process.
     */
    public virtual void convertResponse() {
        System.debug('Base: Starting convertResponse');
        method1();
        method2();
        method3();
        method4();
        method5();
        System.debug('Base: Ending convertResponse');
    }

    /**
     * Virtual method1 - Can be overridden by child classes.
     * Base implementation with debug for tracing.
     */
    protected virtual void method1() {
        System.debug('Base: Executing method1');
    }

    /**
     * Virtual method2 - Can be overridden by child classes.
     * Base implementation with debug for tracing.
     */
    protected virtual void method2() {
        System.debug('Base: Executing method2');
    }

    /**
     * Virtual method3 - Can be overridden by child classes.
     * Base implementation with debug for tracing.
     */
    protected virtual void method3() {
        System.debug('Base: Executing method3');
    }

    /**
     * Private method4 - Common to all child classes, cannot be overridden.
     * Encapsulates shared logic with debug for tracing.
     */
    private void method4() {
        System.debug('Base: Executing private method4 (shared)');
    }

    /**
     * Private method5 - Common to all child classes, cannot be overridden.
     * Encapsulates shared logic with debug for tracing.
     */
    private void method5() {
        System.debug('Base: Executing private method5 (shared)');
    }
}