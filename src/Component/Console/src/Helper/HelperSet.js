const InvalidArgumentException = Jymfony.Console.Exception.InvalidArgumentException;

/**
 * @memberOf Jymfony.Console.Helper
 * @type HelperSet
 */
module.exports = class HelperSet {
    constructor(helpers = []) {
        this._helpers = {};

        for (let helper of helpers) {
            this.set(helper);
        }
    }

    /**
     * Sets a helper.
     *
     * @param {Jymfony.Console.Helper.HelperInterface} helper The helper instance
     */
    set(helper) {
        this._helpers[helper.name] = helper;

        helper.helperSet = this;
    }

    /**
     * Returns true if the helper if defined.
     *
     * @param {string} name The helper name
     *
     * @returns {boolean} true if the helper is defined, false otherwise
     */
    has(name) {
        return undefined !== this._helpers[name];
    }

    /**
     * Gets a helper value.
     *
     * @param {string} name The helper name
     *
     * @returns {Jymfony.Console.Helper.HelperInterface} The helper instance
     *
     * @throws {Jymfony.Console.Exception.InvalidArgumentException} if the helper is not defined
     */
    get(name) {
        if (! this.has(name)) {
            throw new InvalidArgumentException(`The helper "${name}" is not defined.`);
        }

        return this._helpers[name];
    }

    /**
     * Sets the command associated with this helper set.
     *
     * @param {Jymfony.Console.Command.Command} command A Command instance
     */
    set command(command) {
        this._command = command;
    }

    /**
     * Gets the command associated with this helper set.
     *
     * @returns {Jymfony.Console.Command.Command} A Command instance
     */
    getCommand() {
        return this._command;
    }

    /**
     * @returns {Jymfony.Console.Helper.HelperInterface[]}
     */
    * [Symbol.iterator]() {
        yield * Object.values(this._helpers);
    }
};
