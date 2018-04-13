export const BankData = [
    {
        key: 0,
        name: "RBC",
    },
    {
        key: 1,
        name: "TD Bank",
    },
    {
        key: 2,
        name: "ScotiaBank",
    },
    {
        key: 3,
        name: "BMO",
    },
    {
        key: 4,
        name: "CIBC",
    },
    {
        key: 5,
        name: "Tangerine",
    }
];

export function getBankName (key) {
    let id = key;
    if (id < BankData.length && id >= 0) { 
        return BankData[id].name;
    }
    return null;
}