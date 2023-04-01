pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

struct MintedAchievement
{
    Achievement achievement;
    uint256 nftTokenId;
}

struct Dashboard
{
    uint numLogins;
    uint numTrades;
    int balance;
    int deposits;
    Achievement[] achievementsAvailableToMint;
    MintedAchievement[] achievementsIssued;
}

// Threshold values for each stat that must be reached before a token can be Issued
    enum Achievement {
        LOGIN_ACHIEVEMENT,
        TRADE_ACHIEVEMENT_1,
        TRADE_ACHIEVEMENT_2,
        TRADE_ACHIEVEMENT_3,
        GAINS_ACHIEVEMENT_1,
        GAINS_ACHIEVEMENT_2,
        GAINS_ACHIEVEMENT_3,
        LOSS_ACHIEVEMENT_1,
        LOSS_ACHIEVEMENT_2,
        LOSS_ACHIEVEMENT_3,
        DEPOSIT_ACHIEVEMENT_1,
        DEPOSIT_ACHIEVEMENT_2,
        DEPOSIT_ACHIEVEMENT_3,
        REFERRAL_ACHIEVEMENT
    }
    
contract MiamiBull is ERC721URIStorage
{
    constructor() public ERC721("MiamiBull", "MBLL") {

        // unfinished - update these when images are ready
        _nftURIs[Achievement.LOGIN_ACHIEVEMENT] = "bafybeiccfibseku6cykosr3gcqiuudvqeoycakpkrcxh4g5sy2zzrqzazq";
        _nftURIs[Achievement.TRADE_ACHIEVEMENT_1] = "bafybeiccfibseku6cykosr3gcqiuudvqeoycakpkrcxh4g5sy2zzrqzazq";
        _nftURIs[Achievement.TRADE_ACHIEVEMENT_2] = "bafybeiccfibseku6cykosr3gcqiuudvqeoycakpkrcxh4g5sy2zzrqzazq";
        _nftURIs[Achievement.TRADE_ACHIEVEMENT_3] = "bafybeiccfibseku6cykosr3gcqiuudvqeoycakpkrcxh4g5sy2zzrqzazq";
        _nftURIs[Achievement.GAINS_ACHIEVEMENT_1] = "bafybeiccfibseku6cykosr3gcqiuudvqeoycakpkrcxh4g5sy2zzrqzazq";
        _nftURIs[Achievement.GAINS_ACHIEVEMENT_2] = "bafybeiccfibseku6cykosr3gcqiuudvqeoycakpkrcxh4g5sy2zzrqzazq";
        _nftURIs[Achievement.GAINS_ACHIEVEMENT_3] = "bafybeiccfibseku6cykosr3gcqiuudvqeoycakpkrcxh4g5sy2zzrqzazq";
        _nftURIs[Achievement.LOSS_ACHIEVEMENT_1] = "bafybeiccfibseku6cykosr3gcqiuudvqeoycakpkrcxh4g5sy2zzrqzazq";
        _nftURIs[Achievement.LOSS_ACHIEVEMENT_2] = "bafybeiccfibseku6cykosr3gcqiuudvqeoycakpkrcxh4g5sy2zzrqzazq";
        _nftURIs[Achievement.LOSS_ACHIEVEMENT_3] = "bafybeiccfibseku6cykosr3gcqiuudvqeoycakpkrcxh4g5sy2zzrqzazq";
        _nftURIs[Achievement.DEPOSIT_ACHIEVEMENT_1] = "bafybeiccfibseku6cykosr3gcqiuudvqeoycakpkrcxh4g5sy2zzrqzazq";
        _nftURIs[Achievement.DEPOSIT_ACHIEVEMENT_2] = "bafybeiccfibseku6cykosr3gcqiuudvqeoycakpkrcxh4g5sy2zzrqzazq";
        _nftURIs[Achievement.DEPOSIT_ACHIEVEMENT_3] = "bafybeiccfibseku6cykosr3gcqiuudvqeoycakpkrcxh4g5sy2zzrqzazq";
        _nftURIs[Achievement.REFERRAL_ACHIEVEMENT] = "bafybeiccfibseku6cykosr3gcqiuudvqeoycakpkrcxh4g5sy2zzrqzazq";
    }

    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;

    // IPFS URIs for our achievement badges
    mapping(Achievement => string) public _nftURIs;

    // The user's statistics
    uint public _logins;
    uint public _trades;
    int public _balance;
    int public _deposits;  
    
    // Name and symbol for the ERC721 token
    string public constant tokenName = "Miami Bull";
    string public constant tokenSymbol = "MBULL";

    // achievements that have been reached
    mapping(Achievement => bool) public _achievements;
    Achievement[] public _achievementEnums;

    // minted achievements (subset of reached achievements)
    MintedAchievement[] public _achievementsMinted;

    // referral account ids
    mapping(address => bool) public _referrals;

    // Function to return the base URI for the token metadata
    function _baseURI() internal view virtual override returns (string memory) {
        return "ipfs://";
    }

    // only add a particular achievement once
    function addAchievement(Achievement thisAchievement) public {
        if (_achievements[thisAchievement] == false)
        {
            _achievements[thisAchievement] = true;
            _achievementEnums.push(thisAchievement);
        }
    }

    // Function to mint an NFT
    function mint(Achievement thisAchievement) public returns (uint256) {
        if (_achievements[thisAchievement] == false)
        {
            return 0;
        }

        string memory metadataURI = _nftURIs[thisAchievement];

        _tokenIds.increment();

        uint256 id = _tokenIds.current();

        _mint(msg.sender, id);
        _setTokenURI(id, metadataURI);

        _achievementsMinted.push(MintedAchievement(thisAchievement, id));

        return id;
    }

    // Records a new login event by the owner of this contract
    // returns the total number of logins to date
    function recordNewLogin() public returns (uint) {
        _logins++;

        // award achievement with first login
        if (_logins > 0) {
            addAchievement(Achievement.LOGIN_ACHIEVEMENT);
        }

        return _logins;
    }

    // Records a new trade by the owner of this contract
    // We will assume every trade is the entire amount available
    // If we trade away from deposit currency, we leave balance alone. "trade value" is ignored
    // If we trade back to deposit currency, we adjust balance to the "trade value".
    // In addition to incrementing the trade count, if we trade back to deposit currency we also
    // consider that a realized gain-or-loss event. We then take ((balance - total-deposits) / total-deposits)
    // to check for GAIN or LOSS achievements
    // returns total number of trades
    function recordNewTrade(int tradeValue, bool toDepositCurrency) public returns (uint)
    {
        _trades++;

        // award achievement for first, tenth and fiftieth trade
        if (_trades >= 1)
        {
            addAchievement(Achievement.TRADE_ACHIEVEMENT_1);
        }
        if (_trades >= 10)
        {
            addAchievement(Achievement.TRADE_ACHIEVEMENT_2);
        }
        if (_trades >= 50)
        {
            addAchievement(Achievement.TRADE_ACHIEVEMENT_3);
        }

        if (toDepositCurrency) {
            _balance = tradeValue;
            int percentageDiff = ((_balance - _deposits) * 100) / _deposits;

            if (percentageDiff >= 1) {
                addAchievement(Achievement.GAINS_ACHIEVEMENT_1);
            }

            if (percentageDiff >= 10) {
                addAchievement(Achievement.GAINS_ACHIEVEMENT_2);
            }

            if (percentageDiff >= 100) {
                addAchievement(Achievement.GAINS_ACHIEVEMENT_3);
            }

            if (percentageDiff <= -1) {
                addAchievement(Achievement.LOSS_ACHIEVEMENT_1);
            }

            if (percentageDiff <= -10) {
                addAchievement(Achievement.LOSS_ACHIEVEMENT_2);
            }

            if (percentageDiff <= -100) {
                addAchievement(Achievement.LOSS_ACHIEVEMENT_3);
            }
        }

        return _trades;
    }

    // Record a new deposit by the owner of this contract, in a base currency (USD?)
    // returns total deposits made
    function recordNewDeposit(int newDeposit) public returns (int) {
        _deposits += newDeposit;
        _balance += newDeposit;

        // Check if the trade threshold has been reached
        if (_deposits >= 1) {
            addAchievement(Achievement.DEPOSIT_ACHIEVEMENT_1);
        }
        if (_deposits >= 50) {
            addAchievement(Achievement.DEPOSIT_ACHIEVEMENT_2);
        }
        if (_deposits >= 100) {
            addAchievement(Achievement.DEPOSIT_ACHIEVEMENT_3);
        }

        return _deposits;
    }

    // The owner of this contract can refer a new user
    // The referral will be recorded in the blockchain and if that person logs in later
    // this contract owner gets an achievement
    function recordNewReferral(address newReferralAccountId) public {
        if (_referrals[newReferralAccountId] == false) {
            _referrals[newReferralAccountId] = true;
        }
    }

    // When a new user signs in on the UI's referral page, they will give the address-id of the
    // account that referred them. The UI will invoke that owner's contract to call this method to verify
    // that this new account was really referred by then. If so, they get a referral achievement.
    // Returns true if that referral was legit, false if not.
    function verifyReferral(address newReferralAccountId) public returns (bool) {
        if (_referrals[newReferralAccountId] == true) {
            addAchievement(Achievement.REFERRAL_ACHIEVEMENT);
        }

        return _referrals[newReferralAccountId];
    }

    function getDashboard() public view returns (Dashboard memory) {
        Dashboard memory dashboard = Dashboard(
            _logins,
            _trades,
            _balance,
            _deposits,
            _achievementEnums,
            _achievementsMinted
        );

        return dashboard;
    }
}
