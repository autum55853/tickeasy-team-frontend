# 架構說明

## 目錄結構

```
src/
├── main.tsx                    # 應用入口：StrictMode > Theme(Radix) > BrowserRouter > App
├── App.tsx                     # QueryClientProvider + ModalStatusProvider + Boot + Toaster + CustomerServiceWidget
├── vite-env.d.ts               # Vite 環境變數型別宣告
│
├── assets/                     # 靜態資源
│   ├── icons/                  # SVG 圖示（arrow-right、bus、calendar、chevron-*、close、facebook、line、map-pin、menu、search 等）
│   └── images/                 # 應用圖片（banner、card、map、logo、undraw 插圖）
│       └── questionDetailContent/  # FAQ 步驟截圖
│
├── context/                    # React Context（跨元件但不需全域的流程狀態）
│   ├── modalStatusContext.tsx   # 忘記密碼 Modal 開關、重設密碼流程資料
│   ├── buyTicketContext.tsx     # 購票流程（場次、票種、購買人資訊、訂單 ID）
│   ├── concertFilterContext.tsx # 演唱會搜尋篩選條件（地點、標籤、日期等）
│   ├── createOrganizerContext.tsx # 建立主辦方組織的流程狀態
│   └── questionDetailContext.tsx  # FAQ 詳情頁的導航狀態（目前選中的問題）
│
├── schema/                     # 全域 Zod schema（跨模組共用）
│   └── example.ts              # schema 撰寫範例模板
│
├── store/                      # 全域 Zustand store
│   ├── authStore.ts            # 登入狀態（email、role、isLogin）+ Cookie（auth_token）管理，以 localStorage 持久化
│   └── customer-service.ts     # AI 客服對話訊息狀態
│
├── utils/                      # 全域工具函式
│   ├── authUtils.ts            # redirectToDashboard()（跳轉管理後台）、canAccessDashboard()（admin/superuser 權限檢查）
│   ├── formatTime.ts           # 時間格式化（顯示日期時間）
│   └── formatToPrice.ts        # 金額格式化（台幣顯示）
│
├── pages/                      # 頁面模組（自動路由聚合）
│   ├── index.ts                # import.meta.glob 掃描所有 config.ts，合併為 routes[] 並匯出給 core/routers
│   │
│   ├── comm/                   # 共用頁面模組（登入、註冊、OAuth、FAQ、錯誤頁）
│   │   ├── config.ts           # 路由定義（/login、/signup、/callback、/question、/question/detail、/403、/404）
│   │   ├── hook/
│   │   │   ├── QuestionDetailProvider.tsx    # FAQ 詳情 Context Provider
│   │   │   └── useQuestionDetailContext.ts   # useContext hook，存取 QuestionDetailContext
│   │   ├── types/
│   │   │   ├── Concert.ts      # 演唱會卡片型別（FAQ 中使用）
│   │   │   └── question.ts     # FAQ 問題列表、分類、詳情型別
│   │   └── views/
│   │       ├── layout.tsx               # 共用佈局（Header + Footer 包裹）
│   │       ├── login.tsx                # 登入頁
│   │       ├── signUp.tsx               # 註冊頁
│   │       ├── googleAuthCallbackPage.tsx  # Google OAuth callback：取得 token 並存入 cookie
│   │       ├── question.tsx             # FAQ 列表頁
│   │       ├── questionDetail.tsx       # FAQ 詳情頁（含側邊欄導覽）
│   │       ├── 403.tsx                  # 無權限頁面
│   │       ├── 404.tsx                  # 找不到頁面
│   │       └── components/              # comm 模組專用元件
│   │           ├── loginSection.tsx          # 登入表單（email、密碼、忘記密碼）
│   │           ├── signupSection.tsx         # 註冊表單（姓名、email、密碼、條款同意）
│   │           ├── googleButton.tsx          # Google 登入 / 註冊按鈕
│   │           ├── modalForgotPassword.tsx   # 忘記密碼 Modal（輸入 email 送驗證碼）
│   │           ├── resetPassword.tsx         # 重設密碼表單（輸入驗證碼 + 新密碼）
│   │           ├── imageSection.tsx          # 登入 / 註冊頁左側插圖區
│   │           ├── notFoundSection.tsx       # 404 插圖與說明
│   │           ├── searchSection.tsx         # FAQ 搜尋輸入框區塊
│   │           ├── questionCard.tsx          # FAQ 問題分類卡片
│   │           ├── questionButtonGroup.tsx   # FAQ 分類篩選按鈕群組
│   │           ├── questionNormalList.tsx    # FAQ 問題一般列表
│   │           ├── questionNormalListItem.tsx # FAQ 列表單一問題項目
│   │           ├── questionDetailSidebar.tsx  # FAQ 詳情左側章節導覽（桌面版）
│   │           ├── QuestionDetailDropdown.tsx # FAQ 詳情章節下拉選單（手機版）
│   │           ├── questionDetailContent.tsx  # FAQ 詳情內容容器（根據選中章節渲染對應元件）
│   │           ├── concertCard.tsx            # 演唱會卡片（FAQ 中展示範例用）
│   │           └── questionDetailContent/     # 各 FAQ 主題的詳細內容元件
│   │               ├── MemberLogin.tsx          # 如何登入
│   │               ├── MemberSignup.tsx         # 如何註冊
│   │               ├── MemberForgotPassword.tsx # 忘記密碼流程
│   │               ├── MemberChangePersonalInfo.tsx  # 修改個人資料
│   │               ├── MemberChangePassword.tsx      # 修改密碼
│   │               ├── MemberOrganizeConcert.tsx     # 如何舉辦演唱會
│   │               ├── ConcertAllInfo.tsx       # 查看所有演唱會
│   │               ├── ConcertSingleInfo.tsx    # 查看單一演唱會詳情
│   │               ├── ConcertSignup.tsx        # 演唱會報名流程
│   │               ├── TicketPurchase.tsx       # 購票流程說明
│   │               ├── TicketPayment.tsx        # 付款方式說明
│   │               ├── TicketPickup.tsx         # 取票說明
│   │               ├── TicketCheck.tsx          # 驗票說明
│   │               ├── TicketRefund.tsx         # 退票說明
│   │               ├── TicketTransfer.tsx       # 轉票說明
│   │               └── index.ts                 # 統一匯出所有詳情元件
│   │
│   ├── home/                   # 首頁模組
│   │   ├── config.ts           # 路由定義（/）
│   │   ├── hooks/
│   │   │   └── useCounter.tsx  # 首頁統計數字計數器動畫 hook
│   │   ├── types/              # 首頁各區塊資料型別（CategoryCard、LastestCard、TrendCard、VenueCard 等）
│   │   ├── views/
│   │   │   └── page.tsx        # 首頁主元件（組合各區塊）
│   │   └── components/
│   │       ├── bannerSection.tsx      # 首頁頂部 Banner 輪播區
│   │       ├── bannerCarousel.tsx     # Banner 輪播容器
│   │       ├── bannerCarouselItem.tsx # 單一 Banner 輪播項目
│   │       ├── CategorySection.tsx    # 演唱會分類瀏覽區塊
│   │       ├── CategoryCard.tsx       # 分類卡片（含圖示與名稱）
│   │       ├── CategoryTab.tsx        # 分類 Tab 切換（桌面版）
│   │       ├── CategorySelect.tsx     # 分類下拉選單（手機版）
│   │       ├── LastestSection.tsx     # 最新演唱會區塊
│   │       ├── LastestCard.tsx        # 最新演唱會卡片
│   │       ├── LastestCarousel.tsx    # 最新演唱會輪播
│   │       ├── TrendSection.tsx       # 熱門演唱會區塊
│   │       ├── TrendCard.tsx          # 熱門演唱會卡片
│   │       ├── VenueSection.tsx       # 場館探索區塊
│   │       ├── VenueCard.tsx          # 場館卡片（含圖片與地點）
│   │       ├── VenueCarousel.tsx      # 場館輪播
│   │       └── mobileTitle.tsx        # 手機版區塊標題元件
│   │
│   ├── concerts/               # 演唱會模組（列表、詳情、建立/編輯、購票、驗票）
│   │   ├── config.ts           # 路由定義（/concerts、/concert/:id、建立、編輯、購票、付款、驗票）
│   │   ├── hook/
│   │   │   ├── BuyTicketContext.tsx       # 購票流程 Context Provider
│   │   │   ├── ConcertFilterContext.tsx   # 搜尋篩選 Context Provider
│   │   │   ├── useBuyTicketContext.tsx    # useContext hook，存取 BuyTicketContext
│   │   │   ├── useFilterContext.ts        # useContext hook，存取 ConcertFilterContext
│   │   │   ├── useImageUpload.ts          # 圖片上傳 hook（呼叫 /upload/image API）
│   │   │   ├── useLocationTags.ts         # 地點標籤資料取得 hook
│   │   │   ├── useMusicTags.ts            # 音樂標籤資料取得 hook
│   │   │   └── useSeattableUpload.tsx     # 座位表（Seatable）資料上傳相關
│   │   ├── store/
│   │   │   └── useConcertStore.ts         # Zustand（非持久化），管理演唱會建立/編輯完整狀態：
│   │   │                                  # info（基本資料）、sessions（場次）、venues（場館）、
│   │   │                                  # organizationConcerts（主辦方演唱會列表）、
│   │   │                                  # locationTags、musicTags、concertReviews、
│   │   │                                  # concertStatsData（統計）、checkInData（入場）
│   │   ├── types/
│   │   │   ├── BuyTicket.tsx     # 購票流程型別（場次、票種、購買人、訂單）
│   │   │   ├── ConcertCard.tsx   # 演唱會卡片顯示型別
│   │   │   ├── ConcertData.tsx   # 演唱會詳細資料型別（含 sessions、tickets）
│   │   │   ├── FilterItem.tsx    # 篩選條件項目型別
│   │   │   └── RawConertData.tsx # API 回傳原始演唱會資料型別
│   │   ├── views/
│   │   │   ├── allConcertsPage.tsx              # 演唱會搜尋列表頁（含篩選側邊欄）
│   │   │   ├── search.tsx                        # 搜尋結果頁
│   │   │   ├── singleConcertPage.tsx             # 演唱會詳情頁（含場次、購票入口）
│   │   │   ├── previewConcertPage.tsx            # 演唱會預覽頁（主辦方送審前預覽）
│   │   │   ├── createConInfoPage.tsx             # 建立/編輯演唱會 Step 1（基本資料）
│   │   │   ├── createConSessionsAndTicketsPage.tsx # 建立/編輯演唱會 Step 2（場次與票種）
│   │   │   ├── buyTickerPage.tsx                 # 購票流程頁（選票 → 填資料 → 確認 → 付款）
│   │   │   ├── paymentResultPage.tsx             # 付款結果頁（成功/失敗顯示）
│   │   │   └── verifyQRCodePage.tsx              # QR Code 驗票頁（主辦方現場驗票）
│   │   └── components/
│   │       ├── ConcertCard.tsx              # 演唱會列表卡片
│   │       ├── ConcertListSection.tsx       # 演唱會列表區塊（含分頁）
│   │       ├── FilterSection.tsx            # 篩選條件側邊欄（桌面版）
│   │       ├── FilterDialog.tsx             # 篩選條件 Dialog（手機版）
│   │       ├── FilterGroupButton.tsx        # 篩選按鈕群組（多選）
│   │       ├── bannerSection.tsx            # 搜尋頁頂部 Banner
│   │       ├── ConcertDetailPage.tsx        # 演唱會詳情頁面容器
│   │       ├── ConcertBasicInfoSection.tsx  # 演唱會基本資訊展示區（名稱、時間、地點）
│   │       ├── ConcertDetailsSection.tsx    # 演唱會詳細說明（Lexical 富文字顯示）
│   │       ├── ConcertLocationSection.tsx   # 演唱會地點（Google Maps 嵌入）
│   │       ├── ConcertSessionSection.tsx    # 場次列表與票種資訊
│   │       ├── ConcertTagsSection.tsx       # 標籤顯示（地點、音樂類型）
│   │       ├── ConcertFormActions.tsx       # 建立/編輯表單底部操作（儲存草稿、下一步、送審）
│   │       ├── BannerUploadSection.tsx      # Banner 圖片上傳區塊（拖拉或點選）
│   │       ├── TicketTypeTable.tsx          # 票種設定表格（桌面版）
│   │       ├── TicketTypeAccordion.tsx      # 票種設定 Accordion（手機版）
│   │       ├── TicketStepper.tsx            # 購票數量步進器（加減按鈕）
│   │       ├── BeforeBuyTicket.tsx          # 購票前注意事項確認
│   │       ├── BuyTicketSection.tsx         # 購票主流程區塊（選場次、選票種）
│   │       ├── InsertBuyerInfoSection.tsx   # 填寫購買人資訊表單
│   │       ├── ConfirmOrderSection.tsx      # 訂單確認（顯示購買明細）
│   │       ├── PaymentSelector.tsx          # 付款方式選擇（信用卡）
│   │       ├── PaymentResultSection.tsx     # 付款結果顯示（成功/失敗訊息）
│   │       ├── PrecautionAndNeedtoKnow.tsx  # 購票注意事項與須知
│   │       ├── QrScanner.tsx               # QR Code 掃描元件（使用鏡頭）
│   │       └── BackToListButton.tsx        # 返回演唱會列表按鈕
│   │
│   ├── company/                # 主辦方後台模組
│   │   ├── config.ts           # 路由定義（/company、/companyDetail、/company/concert/status/:concertId）
│   │   ├── hook/
│   │   │   ├── CreateOrganizerProvider.tsx    # 建立主辦方 Context Provider
│   │   │   └── useCreateOrganizerContext.ts   # useContext hook，存取 CreateOrganizerContext
│   │   ├── schemas/
│   │   │   └── companyFormSchema.ts  # 主辦方建立表單 Zod schema（公司名稱、描述、聯絡資料等）
│   │   ├── types/
│   │   │   ├── company.ts       # 主辦方/公司資料型別（組織資料、成員等）
│   │   │   └── concertStatus.ts # 演唱會販售統計型別（票種銷售量、入場數等）
│   │   ├── views/
│   │   │   ├── company.tsx         # 主辦方公司列表頁（顯示所屬組織）
│   │   │   ├── companyDetail.tsx   # 主辦方公司詳情頁（組織資訊 + 旗下演唱會）
│   │   │   └── concertStatus.tsx   # 演唱會販售統計頁（票種銷售 + 入場記錄）
│   │   └── components/
│   │       ├── bannerSection.tsx        # 主辦方頁頂部 Banner
│   │       ├── companyCard.tsx          # 公司/組織卡片
│   │       ├── companyConcertCard.tsx   # 主辦方旗下演唱會卡片
│   │       ├── companyConcertSection.tsx # 主辦方演唱會列表區塊
│   │       ├── companyDetailSection.tsx # 公司詳情資訊展示區
│   │       ├── companyInfoSection.tsx   # 公司基本資訊區
│   │       ├── createOrangizer.tsx      # 建立主辦方表單頁容器
│   │       ├── emptyOrganizer.tsx       # 尚無主辦方組織的空狀態畫面
│   │       ├── formCreateOrganize.tsx   # 建立主辦方表單元件（react-hook-form + zod）
│   │       ├── listOrganize.tsx         # 主辦方組織列表元件
│   │       ├── ConcertStatusHeader.tsx  # 販售統計頁表頭（演唱會名稱、狀態）
│   │       ├── TicketSalesTable.tsx     # 票種銷售資料表格（票種、數量、金額）
│   │       └── CheckInStatusTable.tsx   # 入場驗票狀態表格（場次、入場數）
│   │
│   └── user/                   # 會員中心模組
│       ├── config.ts           # 路由定義（/user → redirect、/user/about/profile、/user/about/history、/user/about/password）
│       ├── schema/
│       │   ├── updateProfile.ts    # 更新個人資料 Zod schema（姓名、電話、偏好等）
│       │   └── updatePassword.ts   # 更新密碼 Zod schema（舊密碼、新密碼、確認密碼）
│       ├── types/
│       │   ├── porfile.d.ts        # 個人資料型別（注意：拼字為 porfile）
│       │   ├── password.d.ts       # 密碼相關型別
│       │   ├── musicType.d.ts      # 音樂偏好型別（偏好活動類型）
│       │   ├── region.d.ts         # 地區偏好型別
│       │   └── ticketHistory.ts    # 訂票紀錄型別（訂單、票券、狀態）
│       ├── utils/
│       │   ├── preferredEventTypes.ts  # 偏好活動類型 ID 與名稱映射表
│       │   └── preferredRegions.ts     # 偏好地區 ID 與名稱映射表
│       ├── views/
│       │   ├── page.tsx        # 會員中心 Layout（含側邊導覽 Tabs）
│       │   ├── profile.tsx     # 個人資料頁（顯示/編輯）
│       │   ├── history.tsx     # 訂票紀錄頁（已購票清單）
│       │   └── password.tsx    # 修改密碼頁
│       └── components/
│           ├── Tabs.tsx                    # 會員中心側邊頁籤導覽（個人資料、訂票紀錄、修改密碼）
│           ├── ProfileAvatar.tsx           # 頭像顯示與上傳元件
│           ├── ProfileInfo.tsx             # 個人基本資料表單（姓名、電話、生日等）
│           ├── ProfilePreferEventTypes.tsx # 偏好活動類型多選設定
│           ├── ProfilePreferRegions.tsx    # 偏好地區多選設定
│           ├── PasswordInfo.tsx            # 密碼修改表單
│           ├── TicketHistorySection.tsx    # 訂票紀錄列表區塊
│           ├── TicketCard.tsx              # 單一訂票卡片（演唱會名稱、場次、狀態）
│           ├── TicketDetail.tsx            # 訂票詳情（電子票券資訊）
│           ├── EticketCard.tsx             # 電子票券展示卡（含 QR Code）
│           ├── ticketDialog.tsx            # 票券詳情 Dialog（點擊後展開）
│           ├── RefundSection.tsx           # 退票申請區塊
│           ├── ContactOrganizer.tsx        # 聯絡主辦方（顯示聯絡資訊）
│           ├── ContactCustomerService.tsx  # 聯絡客服（跳轉客服入口）
│           ├── AlertError.tsx              # 錯誤提示元件
│           ├── emptyTicketRecord.tsx       # 無訂票紀錄空狀態畫面
│           └── modalVerifyEmail.tsx        # Email 驗證 Modal
│
└── core/                       # 核心基礎設施（全域共用，與業務邏輯無關）
    ├── boot/
    │   └── index.tsx           # 路由渲染主體：呼叫 useRouterMiddleWare，渲染 <Routes>
    ├── routers/
    │   └── index.tsx           # 匯入 src/pages/index.ts 的 routes，重新導出給 Boot
    ├── lib/
    │   ├── axios.ts            # Axios 實例：Bearer token 自動附加、401 自動登出
    │   ├── utils.ts            # cn() = clsx + tailwind-merge（Tailwind class 合併工具）
    │   ├── customer-service-api.ts  # AI 客服後端 API 呼叫封裝
    │   └── registerIconify.js  # Iconify 圖示集批量載入腳本（由 npm run register-icons 執行）
    ├── types/
    │   ├── router.ts           # RouteView（路由定義介面）、ModuleConfig（模組設定介面）
    │   └── customer-service.ts # AI 客服相關型別（訊息、對話紀錄等）
    ├── hooks/                  # 全域共用 Custom Hooks
    │   ├── useRequest.tsx      # TanStack Query CRUD 封裝：useGet / useCreate / useUpdate / useDelete
    │   ├── useRouterMiddleWare.tsx  # scroll-to-top + 路由守衛（needLogin）+ 未知路徑導向 /404
    │   ├── useLogout.tsx       # 登出：清除 authStore + cookie，導向 /login
    │   ├── usePagination.tsx   # 分頁邏輯 hook（currentPage、totalPages、handlePageChange）
    │   ├── useToast.tsx        # Toast 通知 hook（封裝 shadcn/ui toaster）
    │   ├── useHeaderSearchBar.tsx   # Header 搜尋列展開/收合狀態管理
    │   ├── useEmailValidation.ts    # Email 格式即時驗證 hook
    │   ├── usePasswordValidation.ts # 密碼強度驗證 hook
    │   ├── useImportImages.ts       # 動態載入 assets/images 目錄圖片 hook
    │   └── useCustomerService.ts    # AI 客服對話邏輯 hook（送出訊息、接收回應）
    ├── icons/
    │   └── register.ts         # 呼叫 registerIconify.js，批量向 Iconify 註冊圖示集
    ├── styles/
    │   ├── global.css          # 全域 CSS（TailwindCSS base、自訂 CSS variables、字型設定）
    │   └── singleConcertPage.css # 演唱會詳情頁專用 CSS（特殊排版需求）
    └── components/
        ├── global/             # 全域佈局元件（所有頁面共用）
        │   ├── header.tsx           # 頂部導覽列（Logo、搜尋列、選單、登入狀態）
        │   ├── footer.tsx           # 頁尾（連結、社群、版權）
        │   ├── deaktopMenuList.tsx  # 桌面版導覽選單列表
        │   ├── mobileMenuList.tsx   # 手機版導覽選單（Drawer 抽屜）
        │   ├── deaktopSearchBar.tsx # 桌面版搜尋列（Inline 展開）
        │   ├── mobileSearchBar.tsx  # 手機版搜尋列（全螢幕）
        │   ├── ScrollTopBtn.tsx     # 回到頂部浮動按鈕
        │   ├── lexicalEditor.tsx    # Lexical 富文字編輯器（主辦方描述演唱會用）
        │   ├── confirmDialog.tsx    # 通用確認 Dialog（刪除、送審等需二次確認的操作）
        │   ├── loadingSpin.tsx      # 全頁載入中 Spinner（API 請求中遮罩）
        │   ├── googleMap.tsx        # Google Maps 嵌入元件（顯示演唱會場地）
        │   ├── termPrivacy.tsx      # 隱私權政策內容
        │   ├── termService.tsx      # 服務條款內容
        │   └── termsDialog.tsx      # 條款 Dialog 容器（包裹 termPrivacy / termService）
        ├── customer-service/   # AI 客服浮動 Widget（全域，由 App.tsx 掛載）
        │   ├── CustomerServiceWidget.tsx       # 浮動按鈕 + 聊天視窗整合（position、theme 可設定）
        │   ├── CustomerServiceChat.tsx          # 對話介面（訊息列表、輸入框、送出按鈕）
        │   ├── SimpleCustomerServiceWidget.tsx  # 簡化版客服 Widget（備用）
        │   └── index.ts                         # 統一匯出 CustomerServiceWidget
        └── ui/                 # shadcn/ui 元件（基於 Radix UI，可無障礙存取）
            ├── button.tsx / button-variants.ts  # 按鈕元件與 variant 設定（primary、outline、ghost 等）
            ├── dialog.tsx / alertDialog.tsx      # 對話框 / 確認對話框元件
            ├── input.tsx                         # 文字輸入框
            ├── select.tsx                        # 下拉選單（Radix Select）
            ├── checkbox.tsx / switch.tsx         # 核取方塊 / 開關
            ├── calendar.tsx                      # 日曆元件（react-day-picker）
            ├── dateRangPicker.tsx                # 日期範圍選擇器
            ├── datetimePicker.tsx                # 日期時間選擇器（含時分）
            ├── singleDatePicker.tsx              # 單日日期選擇器
            ├── timeOnlyPicker.tsx                # 僅時間選擇器
            ├── pagination.tsx                    # 分頁元件（頁碼導覽）
            ├── breadcrumbs.tsx                   # 麵包屑導覽列
            ├── tab.tsx                           # 頁籤元件（Radix Tabs）
            ├── separator.tsx                     # 分隔線
            ├── accordion.tsx                     # 折疊面板（Radix Accordion）
            ├── popover.tsx                       # 浮動內容框（Radix Popover）
            ├── Carousel.tsx                      # 輪播元件（Embla Carousel）
            ├── LexicalViewer.tsx                 # Lexical 富文字唯讀顯示器（防 XSS，安全渲染）
            ├── toast.tsx                         # Toast 提示元件（訊息樣板）
            └── toaster.tsx                       # Toast 容器（由 App.tsx 全域掛載）
```

---

## 啟動流程

```
main.tsx
  └── StrictMode
        └── Theme（Radix UI 主題）
              └── BrowserRouter（React Router）
                    └── App.tsx
                          └── QueryClientProvider（TanStack Query client）
                                └── ModalStatusProvider（React Context：忘記密碼 Modal）
                                      ├── Boot（src/core/boot/index.tsx）
                                      │     ├── useRouterMiddleWare()
                                      │     │     ├── 換頁時 scroll to top
                                      │     │     ├── needLogin 路由守衛
                                      │     │     └── 未知路徑 → /404
                                      │     └── <Routes> 渲染所有路由
                                      ├── <Toaster />（全域 Toast 通知）
                                      └── <CustomerServiceWidget />（全域 AI 客服浮動按鈕）
```

---

## 模組化路由系統

路由採三層自動聚合機制，**新增頁面模組無須手動修改路由設定**：

| 層次 | 檔案 | 說明 |
|---|---|---|
| 1 | `src/pages/*/config.ts` | 各模組定義自己的路由，使用 `lazy()` 懶載入元件 |
| 2 | `src/pages/index.ts` | `import.meta.glob("./*/config.ts", { eager: true })` 掃描所有 config，合併為 `routes[]` |
| 3 | `src/core/routers/index.tsx` | 將 `routes` 重新導出給 `Boot` 使用 |

### 路由守衛（useRouterMiddleWare）

| 情境 | 行為 |
|---|---|
| `needLogin: true` + 未登入 | 導向 `/login`（帶 `state.from` 以便登入後返回）|
| 未知路徑 | 導向 `/404` |
| 有 `redirect` 欄位 | 客戶端重新導向（支援動態 params）|
| 每次換頁 | 自動 `window.scrollTo(0, 0)`（可透過 `state.skipAutoScroll` 跳過）|

### 路由總覽

| 路徑 | 元件 | 需登入 | 說明 |
|---|---|:---:|---|
| `/` | home/page | - | 首頁 |
| `/login` | comm/login | - | 登入 |
| `/signup` | comm/signUp | - | 註冊 |
| `/callback` | comm/googleAuthCallbackPage | - | Google OAuth callback |
| `/question` | comm/question | - | 常見問題列表 |
| `/question/detail` | comm/questionDetail | - | 問題詳情 |
| `/403` | comm/403 | - | 無權限 |
| `/404` | comm/404 | - | 找不到頁面 |
| `/concerts` | concerts/allConcertsPage | - | 演唱會搜尋列表 |
| `/concert/:concertId` | concerts/singleConcertPage | - | 演唱會詳情 |
| `/concert/preview/:concertId` | concerts/previewConcertPage | ✓ | 演唱會預覽（主辦方）|
| `/concert/create/info` | concerts/createConInfoPage | ✓ | 建立演唱會 Step 1 |
| `/concert/edit/:concertId/info` | concerts/createConInfoPage | ✓ | 編輯演唱會 Step 1 |
| `/concert/create/sessions-and-tickets` | concerts/createConSessionsAndTicketsPage | ✓ | 建立演唱會 Step 2 |
| `/concert/edit/:concertId/sessions-and-tickets` | concerts/createConSessionsAndTicketsPage | ✓ | 編輯演唱會 Step 2 |
| `/concert/buyTicket/:concertId` | concerts/buyTickerPage | ✓ | 購票流程 |
| `/concert/paymentResult` | concerts/paymentResultPage | ✓ | 付款結果 |
| `/concert/verify-qrcode/:ticketId?` | concerts/verifyQRCodePage | ✓ | QR Code 驗票 |
| `/company` | company/company | ✓ | 主辦方公司列表 |
| `/companyDetail` | company/companyDetail | ✓ | 主辦方公司詳情 |
| `/company/concert/status/:concertId` | company/concertStatus | ✓ | 演唱會販售統計 |
| `/user` | — | ✓ | 重新導向至 `/user/about/profile` |
| `/user/about` | user/page（layout）| ✓ | 會員中心 Layout |
| `/user/about/profile` | user/profile | ✓ | 個人資料 |
| `/user/about/history` | user/history | ✓ | 訂票紀錄 |
| `/user/about/password` | user/password | ✓ | 修改密碼 |

---

## 狀態管理

### Zustand（全域持久化狀態）

**`src/store/authStore.ts`** — 以 `auth-storage` 為 key 存於 localStorage

```ts
{
  email: string;          // 登入者 email
  role: string;           // 角色（participant / organizer / admin）
  isLogin: boolean;
  setAuth(email, role): void;    // 登入後設定帳號與角色
  logout(): void;                // 清除 store + 移除 cookie
  setCookie(token): void;        // 設定 auth_token cookie（7 天有效，Secure + SameSite=Strict）
  getAuthToken(): string | null; // 從 cookie 讀取 auth_token
}
```

**`src/pages/concerts/store/useConcertStore.ts`** — 非持久化，管理演唱會建立/編輯流程

- `info` — 演唱會基本資料（名稱、描述、Banner、地點、標籤等）
- `sessions` — 場次清單（日期、時間、票種）
- `venues` — 場館清單
- `organizationConcerts` — 主辦方的演唱會列表（含分頁）
- `locationTags` / `musicTags` — 可選標籤清單
- `concertReviews` — 審核記錄
- `concertStatsData` / `checkInData` — 統計與入場資料

> `concertId` 額外以 `localStorage`（key: `concertId`）存儲，供頁面刷新後恢復進行中的建立流程。

### TanStack Query（伺服器狀態）

透過 `useRequest<T>({ queryKey, url })` 封裝標準 CRUD：

```ts
const { useGet, useCreate, useUpdate, useDelete } = useRequest<Concert>({
  queryKey: ['concerts'],
  url: '/api/v1/concerts'
});
```

| Hook | HTTP 方法 | 說明 |
|---|---|---|
| `useGet(id?, enabled?)` | GET | 取得列表或單筆資料 |
| `useCreate(options?)` | POST | 新增資料（自動 invalidate queryKey）|
| `useUpdate(options?)` | PUT | 更新指定 ID 資料 |
| `useDelete(options?)` | DELETE | 刪除指定 ID 資料 |

### React Context（頁面流程狀態）

| Context | 路徑 | 用途 |
|---|---|---|
| `ModalStatusContext` | `src/context/modalStatusContext.tsx` | 忘記密碼 Modal 開關、重設密碼流程資料 |
| `BuyTicketContext` | `src/context/buyTicketContext.tsx` | 購票流程（場次、票種、購買人資訊、訂單 ID）|
| `ConcertFilterContext` | `src/context/concertFilterContext.tsx` | 演唱會搜尋篩選條件 |
| `CreateOrganizerContext` | `src/context/createOrganizerContext.tsx` | 建立主辦方流程 |
| `QuestionDetailContext` | `src/context/questionDetailContext.tsx` | FAQ 詳情頁導航（目前選中章節）|

---

## HTTP 請求機制

**`src/core/lib/axios.ts`**

| 設定項 | 值 |
|---|---|
| Base URL | `VITE_API_BASE_URL`（預設 `http://localhost:3001`）|
| Timeout | 10 秒 |
| Content-Type | `application/json` |

**請求攔截器**：自動從 cookie 讀取 `auth_token`，附加 `Authorization: Bearer <token>`

**回應攔截器**：
- 成功 → 直接回傳 `response.data`（非完整 AxiosResponse）
- 401 → 呼叫 `authStore.logout()`，清除 store + cookie，拋出 `"Token expired"`

> 所有 API 呼叫請使用 `axiosInstance`，不要使用原生 `axios`

---

## 認證機制

```
一般登入
  後端驗證 → 回傳 JWT token
  → authStore.setCookie(token)  儲存到 cookie（7 天、Secure + SameSite=Strict）
  → authStore.setAuth(email, role)  更新 Zustand store

Google OAuth
  前端跳轉 Google 授權頁
  → 回調 /callback
  → googleAuthCallbackPage 取得 token
  → 同上存入 cookie + store

API 請求
  Axios 攔截器自動讀取 cookie 附加 token

Token 過期（401）
  Axios 攔截器呼叫 logout()  清除 store + cookie
```

---

## API 端點總覽

所有端點前綴：`/api/v1`

| 方法 | 端點 | 認證 | 說明 |
|---|---|:---:|---|
| GET | `/concerts` | - | 演唱會列表（含分頁、篩選）|
| GET | `/concerts/:concertId` | - | 演唱會詳情 |
| POST | `/concerts/` | ✓ | 建立演唱會（草稿）|
| PUT | `/concerts/:concertId` | ✓ | 更新演唱會 |
| PUT | `/concerts/:concertId/submit` | ✓ | 送審演唱會 |
| PATCH | `/concerts/:concertId/cancel` | ✓ | 取消/刪除演唱會 |
| POST | `/concerts/:concertId/duplicate` | ✓ | 複製演唱會 |
| PATCH | `/concerts/:concertId/visit` | - | 增加瀏覽次數 |
| GET | `/concerts/:concertId/reviews` | ✓ | 取得審核記錄 |
| GET | `/concerts/:concertId/sessions` | ✓ | 取得演唱會場次統計 |
| GET | `/concerts/venues` | - | 場館列表 |
| GET | `/concerts/location-tags` | - | 地點標籤清單 |
| GET | `/concerts/music-tags` | - | 音樂標籤清單 |
| GET | `/organizations/:organizationId/concerts` | ✓ | 主辦方演唱會列表 |
| GET | `/sessions/:sessionId/check-inused` | ✓ | 場次入場記錄 |
| POST | `/upload/image` | ✓ | 上傳圖片（multipart/form-data）|

---

## 演唱會狀態機

```
draft（草稿）
  ↓ 主辦方送審
reviewing（審核中）
  ↓ 通過          ↓ 駁回
published       rejected
（已發布）       （已駁回）→ draft（修改後再送審）
  ↓ 結束
finished（已結束）
```

| 狀態 | 說明 |
|---|---|
| `draft` | 建立中，主辦方可繼續編輯 |
| `reviewing` | 已送審，等待審核（AI 或人工）|
| `published` | 審核通過，對外公開販售 |
| `rejected` | 審核駁回，可修改後再送審 |
| `finished` | 演唱會已結束 |
