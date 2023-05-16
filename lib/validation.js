const validRegex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.checkServerValid = (server)=>{
    return !(server != "America" &&
    server != "Asia" &&
    server != "Europe" &&
    server != "TW,HK,MO");
}
exports.checkEmailValid = (email)=>{
    return email.match(validRegex_email);
}