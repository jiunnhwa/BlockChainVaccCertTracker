// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;

contract FileSystem {
    struct item {
        string name;
        string sex;
        string ic;
        string dob;
        string vaccinationStatus;
        string date;
    }

    mapping(string => item) public store;

    event data(
        string id,
        string sex,
        string name,
        string ic,
        string dob,
        string date,
        string vaccinationStatus
    );

    function createCert(
        string memory id,
        string memory sex,
        string memory name,
        string memory ic,
        string memory dob,
        string memory date,
        string memory vaccinationStatus
    ) public {
        store[id] = item(name, sex, ic, dob, vaccinationStatus, date);
        emit data(id, name, sex, ic, dob, vaccinationStatus, date);
    }

    function fetchCert(string memory id) public view returns (item memory) {
        return store[id];
    }
}
