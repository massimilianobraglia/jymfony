const Bundle = Jymfony.Component.Kernel.Bundle;
const PassConfig = Jymfony.Component.DependencyInjection.Compiler.PassConfig;
const RegisterListenerPass = Jymfony.Component.EventDispatcher.DependencyInjection.Compiler.RegisterListenerPass;
const RoutingResolverPass = Jymfony.Component.Routing.DependencyInjection.RoutingResolverPass;
const LoggerChannelPass = Jymfony.Bundle.FrameworkBundle.DependencyInjection.Compiler.LoggerChannelPass;
const TestServiceContainerRealRefPass = Jymfony.Bundle.FrameworkBundle.DependencyInjection.Compiler.TestServiceContainerRealRefPass;
const TestServiceContainerWeakRefPass = Jymfony.Bundle.FrameworkBundle.DependencyInjection.Compiler.TestServiceContainerWeakRefPass;
const CachePoolPass = Jymfony.Component.Cache.DependencyInjection.CachePoolPass;
const ClassExistenceResource = Jymfony.Component.Config.Resource.ClassExistenceResource;
const AddConsoleCommandPass = Jymfony.Component.Console.DependencyInjection.AddConsoleCommandPass;

/**
 * FrameworkBundle.
 *
 * @memberOf Jymfony.Bundle.FrameworkBundle
 */
class FrameworkBundle extends Bundle {
    /**
     * @inheritdoc
     */
    build(container) {
        container
            .addCompilerPass(new AddConsoleCommandPass())
            .addCompilerPass(new RegisterListenerPass(), PassConfig.TYPE_BEFORE_REMOVING)
            .addCompilerPass(new RoutingResolverPass())
            .addCompilerPass(new LoggerChannelPass())
            .addCompilerPass(new TestServiceContainerWeakRefPass(), PassConfig.TYPE_BEFORE_REMOVING, -32)
            .addCompilerPass(new TestServiceContainerRealRefPass(), PassConfig.TYPE_AFTER_REMOVING)
            .addCompilerPass(new CachePoolPass(), PassConfig.TYPE_BEFORE_OPTIMIZATION, 32)
        ;

        this._addCompilerPassIfExists(container, 'Jymfony.Component.Mime.DependencyInjection.AddMimeTypeGuesserPass');
    }

    /**
     * Adds a compiler pass if class exists.
     *
     * @param {Jymfony.Component.DependencyInjection.ContainerBuilder} container
     * @param {string} pass
     * @param {string} [type = Jymfony.Component.DependencyInjection.Compiler.PassConfig.TYPE_BEFORE_OPTIMIZATION]
     * @param {int} [priority = 0]
     */
    _addCompilerPassIfExists(container, pass, type = PassConfig.TYPE_BEFORE_OPTIMIZATION, priority = 0) {
        container.addResource(new ClassExistenceResource(pass));

        if (ReflectionClass.exists(pass)) {
            const reflector = new ReflectionClass(pass);
            container.addCompilerPass(reflector.newInstance(), type, priority);
        }
    }
}

module.exports = FrameworkBundle;
