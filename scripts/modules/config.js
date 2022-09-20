export default {
    debug: false,
    
    dynamicPropertyWrapper: {
        enabled: true,
        
        uniqueID: "3t6@XB",
    },
    customcommands: {
        prefix: ".",
        vault: true,
        ctl: true,
        sethome: true,
        gohome: true,
        listhome: true,
        delhome: true,
        rbcr: true,
        chatranks: true,
    },
    modules: {
        setHome: {
            enabled: true,
            max: 5,
        },
        goHome: {
            seconds: 0,
            minutes: 5,
            hours: 0,
            days: 0,
        },
        chatranks: {
            enabled: true,
        },
        rbcr: {
            enabled: false,
        },
        encryption: {
            password: "!#7231",
        },
    },
};