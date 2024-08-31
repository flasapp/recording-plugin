export function generateHash(): string {
    // Generate random number
    const randomNumber: number = Math.random();
    // Convert the number into a hexadecimal string
    const hash: string = Math.floor(randomNumber * 0xFFFFFFFFFFFFFFFF).toString(16);

    return hash;
}
