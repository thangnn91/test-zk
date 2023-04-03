// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

// Use only for testing purposes

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../interfaces/IERC677.sol";
import "../interfaces/IERC677TransferReceiver.sol";

contract LinkERC677 is IERC677, ERC20 {
  uint256 public constant INIT_BALANCE = 1_000_000_000 * 1e18;
  address public owner;
  constructor(
    string memory tokenName,
    string memory tokenSymbol
  ) ERC20(tokenName, tokenSymbol) {
    _mint(msg.sender, INIT_BALANCE);
    owner = msg.sender;
  }

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "ONLY_OWNER");
        _;
    }
  /**
   * ERC-677's only method implementation
   * See https://github.com/ethereum/EIPs/issues/677 for details
   */
  function transferAndCall(
    address to,
    uint256 value,
    bytes memory data
  ) external override returns (bool) {
    bool result = super.transfer(to, value);
    if (!result) return false;

    emit Transfer(msg.sender, to, value, data);

    IERC677TransferReceiver receiver = IERC677TransferReceiver(to);
    // slither-disable-next-line unused-return
    receiver.tokenFallback(msg.sender, value, data);

    // IMPORTANT: the ERC-677 specification does not say
    // anything about the use of the receiver contract's
    // tokenFallback method return value. Given
    // its return type matches with this method's return
    // type, returning it could be a possibility.
    // We here take the more conservative approach and
    // ignore the return value, returning true
    // to signal a succesful transfer despite tokenFallback's
    // return value -- fact being tokens are transferred
    // in any case.
    return true;
  }

  function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}