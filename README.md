# zkPolygon

This is a Hardhat project with several simple contracts and their test in TypeScript. It uses [OpenZeppelin](https://www.openzeppelin.com/) contracts as the base contract most of the time.

Compiled contracts are fed into [TypeChain](https://github.com/dethcrypto/TypeChain) to generate types, which are then used within TypeScript.

## Usage

- `npx hardhat compile` to compile the contracts.
- `npx hardhat run --network zkPolygonTestnet scripts\deploy.ERC667.ts` to deploy test contracts.

## Formatting & Linting

- TypeScript codes are formatted & linted with [GTS](https://github.com/google/gts).
- Contracts are formatted with [Solidity + Hardhat](https://hardhat.org/hardhat-vscode/docs/formatting).
- Contracts are linted with [solhint](https://protofire.github.io/solhint).
