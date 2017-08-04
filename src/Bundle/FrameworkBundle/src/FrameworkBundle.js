const Bundle = Jymfony.Component.Kernel.Bundle;
const AddCacheWarmerPass = Jymfony.Bundle.FrameworkBundle.DependencyInjection.Component.AddCacheWarmerPass;
const AddConsoleCommandPass = Jymfony.Component.Console.DependencyInjection.AddConsoleCommandPass;
const RegisterListenerPass = Jymfony.Component.EventDispatcher.DependencyInjection.Compiler.RegisterListenerPass;
const AddCacheClearerPass = Jymfony.Component.Kernel.DependencyInjection.AddCacheClearerPass;


/**
 * Bundle
 *
 * @memberOf Jymfony.FrameworkBundle
 */
class FrameworkBundle extends implementationOf(Bundle) {
    boot() {

    }

    /**
     * Builds the bundle
     *
     * @param {Jymfony.Component.DependencyInjection.ContainerBuilder} container
     */
    build(container) {
        container
            .addCompilerPass(new AddCacheWarmerPass())
            .addCompilerPass(new AddConsoleCommandPass())
            .addCompilerPass(new RegisterListenerPass())
            .addCompilerPass(new AddCacheClearerPass())
        ;
    }
}

module.exports = FrameworkBundle;
