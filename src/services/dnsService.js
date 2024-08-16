const dns = require('dns');

const verifyEmailDomain = (email) => {
    const domain = email.split('@')[1];
    return new Promise((resolve) => {
        dns.resolveMx(domain, (err, addresses) => {
            if (err || addresses.length === 0) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};

module.exports = verifyEmailDomain;