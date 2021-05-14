module.exports = {
    poweredByHeader: false,
    devIndicators: {
        autoPrerender: true,
    },
    generateEtags: false,
    generateBuildId: async () => {
        const rev = fs.readFileSync(".git/HEAD").toString().trim()
        if (rev.indexOf(":") === -1) {
            return rev
        } else {
            return fs
                .readFileSync(".git/" + rev.substring(5))
                .toString()
                .trim()
        }
    },
}
