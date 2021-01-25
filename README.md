# Final project is the accounting book for everyone

### 前情提要：這次我原先的期末報告原先想要做股票交易，有買賣股票，交易成功以後會存入dababase，
### 但是後來發現除了要有第三方交易，最大的問題還是要有即時性的互動，跟聊天室有一點像，
### 例如：A買的價錢和B賣的價錢要相同才可以成交，並把買方和賣方通通存入資料庫裡面，
### 對我來說可能有點太過於複雜，所以我決定用比較簡單的方法，因為買東西和賣東西是不變的，
### 單因為不是互動，而是單純的交易紀錄，從兒產生網路記帳簿的期末報告，有要支出收入的項目，
### 食衣住行其他的形式，收入支出的金額，交易日期，以及要確認他到底是買還是賣

#### 執行方法
1.如果之前已經先註冊的話，就可以在”Log In”中輸入Account和 Password，但如果沒有的話，他會顯示錯誤以及對應的內容，所以就先到Create Account
*****
2.可以更改你的密碼，進入”Change Password”然後輸入帳號以及Email Address和自己想要改的密碼即可
*****
3.登入以後可以看到”歡迎來到XXX日常收支表”填寫以下五點的項目並開始交易，其中除了食衣住行其他此空格必須填寫這幾種，其他都沒有限制
*****
4.交易成功以後可以繼續交易，或者按 “To Deal”就Redirect to Deal Page
*****
5.在Deal Page裡面有個”請看收入支出明細”的按鈕，按了以後就可以顯現各種的明細
*****
6.可以Sign Out來登入自己的帳號密碼
*****
7.如果要刪除自己的帳號密碼，進入”Delete Account”後輸入帳號密碼，就可以刪除自己的帳密
*****

#### 以上就自己簡單的網路記帳簿，但以下是此網頁的缺陷：
1.我沒有處理如果已經註冊的帳號密碼，所以有可能有相同的帳密都放在資料庫，容易造成混亂
*****
2.雖然在記帳簿裡面有加入日期，且在之後的明細也有寫顯示，單應該也要多加一些不同的page讓不同的年月日就
有不同的顯示
*****
3.Button沒做的很好，應該要跟其他有所分開
*****
4.沒有平均每個月的收入支出
*****
5.如果你想要實際在local執行而不是用網路的話，在local時可以設定localhost，並試圖執行
*****
* 以下是我的執行方案
    * `git clone` this repo
    * `yarn install main folder` 
    * `yarn install server folder`  
    * `yarn start`
*****
不是很好的方法，但我一直無法上傳到heroku的最大原因...
*****
已經成功deploy: https://wenliang-accounting-book.herokuapp.com，但還是可以用local的方式來執行試試看XDD

