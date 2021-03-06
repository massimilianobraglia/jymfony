declare namespace Jymfony.Component.Autoloader.Parser.AST {
    export class EmptyStatement extends implementationOf(StatementInterface) {
        public location: SourceLocation;

        /**
         * Constructor.
         */
        __construct(location: SourceLocation): void;
        constructor(location: SourceLocation);

        /**
         * @inheritdoc
         */
        compile(compiler: Compiler): void;
    }
}
