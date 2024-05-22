function ipToBinary(ip) {
    return ip.split('.').map(function(octet) {
        return ('00000000' + parseInt(octet, 10).toString(2)).slice(-8);
    }).join('');
}

function binaryToIp(binary) {
    return binary.match(/.{1,8}/g).map(function(byte) {
        return parseInt(byte, 2);
    }).join('.');
}

function commonPrefixLength(bin1, bin2) {
    let maxLength = Math.min(bin1.length, bin2.length);
    for (let i = 0; i < maxLength; i++) {
        if (bin1[i] !== bin2[i]) {
            return i;
        }
    }
    return maxLength;
}

function convertCIDRtoIPs() {
    let cidr = document.getElementById('cidr').value;
    let [ip, prefixLength] = cidr.split('/');
    prefixLength = parseInt(prefixLength, 10);
    
    let ipBinary = ipToBinary(ip);
    let networkAddressBin = ipBinary.slice(0, prefixLength) + '0'.repeat(32 - prefixLength);
    let broadcastAddressBin = ipBinary.slice(0, prefixLength) + '1'.repeat(32 - prefixLength);
    
    let networkAddress = binaryToIp(networkAddressBin);
    let broadcastAddress = binaryToIp(broadcastAddressBin);
    
    let firstUsableIpBin = networkAddressBin.slice(0, 31) + '1';
    let lastUsableIpBin = broadcastAddressBin.slice(0, 31) + '0';
    
    let firstUsableIp = binaryToIp(firstUsableIpBin);
    let lastUsableIp = binaryToIp(lastUsableIpBin);
    
    document.getElementById('network-address-cidr').textContent = 'Network Address: ' + networkAddress;
    document.getElementById('first-usable-ip').textContent = 'First Usable IP: ' + firstUsableIp;
    document.getElementById('last-usable-ip').textContent = 'Last Usable IP: ' + lastUsableIp;
    document.getElementById('broadcast-address').textContent = 'Broadcast Address: ' + broadcastAddress;
}

function convertIPstoCIDR() {
    let firstIp = document.getElementById('first-ip').value;
    let lastIp = document.getElementById('last-ip').value;
    
    let firstIpBin = ipToBinary(firstIp);
    let lastIpBin = ipToBinary(lastIp);
    
    let prefixLength = commonPrefixLength(firstIpBin, lastIpBin);
    let networkAddressBin = firstIpBin.slice(0, prefixLength) + '0'.repeat(32 - prefixLength);
    let networkAddress = binaryToIp(networkAddressBin);
    
    document.getElementById('cidr-result').textContent = 'CIDR Notation: ' + networkAddress + '/' + prefixLength;
}
