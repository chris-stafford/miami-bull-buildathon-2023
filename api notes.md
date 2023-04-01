# Prototype for ETH contract

* Login
  * Arguments
    * User Wallet Id
  * Increments internal counter for that user wallet id
  * Returns
    * Number of logins
  
* Trades
  * Gains / Loses
    * Arguments  
      * User Wallet Id
      * Amount gained or lost with trade
    * Increments total gains/loses for user wallet id
    * Returns
      * Total gains / loses for user
    
* Deposits
  * Amount
    * Arguments
      * User Wallet Id
      * Amound Deposited
    * Increments total deposits for user wallet id
    * Returns
      * Total deposits for user

* Referal
  * Arguments
    * User Wallet Id
    * Refered User Wallet Id
  * Internal storage on user wallet association
  * Returns
    * void
  
* Referal Signs Up
  * Arguments
    * User (referred) Wallet Id
  * Looks up referal from internal map
  * Records Referal
  * Returns
    * void

* Mint
  * Arguments
    * User wallet id
    * NFT Identifier
  * Returns
    * void
  
* Dashboard Values (Scoreboard)
    * Input: User Wallet ID
    * Returns:
      * Total Gains / Loses
      * Total Number of Trades
      * Total Number of Logins
      * Badges Earned
        * Show image if exists
        * If still being Issued, show "minting in progress...."
      * Badges Available
        * You have made 50 trades
        * You have earned a new Trading Badge
        * Click to Mint...