let langHelper = {
    env: null,
    langInstance: null,

    init(env, langInstance) {
        this.env = env;
        this.langInstance = langInstance;
    },

    get(key) {
        var newKey = key + '.' + this.env.locale;

        try {
            return newKey.split('.').reduce(function(obj, currentKey) {
                return obj[currentKey];
            }, this.langInstance);
        } catch (err) {
            return key;
        }
    },
}

export default langHelper;
