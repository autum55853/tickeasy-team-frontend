import QuestionNormalListItem from "./questionNormalListItem";
import { QuestionType } from "../types/question";

const faqs = [
  {
    title: "如何報名參加演唱會",
    content: "請至我們的活動頁面選擇您有興趣的演唱會，點選「立即報名」，登入會員後即可完成報名。建議提前完成報名，以免錯過名額。",
    link: "/question/detail?faqType=concert",
    type: "concert",
  },
  {
    title: "如何購票",
    content: "請至我們的活動頁面選擇您有興趣的演唱會，點選「立即報名」，登入會員後即可完成報名。建議提前完成報名，以免錯過名額。",
    link: "/question/detail?faqType=ticket",
    type: "ticket",
  },
  {
    title: "如何取票",
    content: "請至我們的活動頁面選擇您有興趣的演唱會，點選「立即報名」，登入會員後即可完成報名。建議提前完成報名，以免錯過名額。",
    link: "/question/detail?faqType=ticket",
    type: "ticket",
  },
  {
    title: "我的電子票券在哪裡查看",
    content: "請於登入會員後，點擊右上方的帳號，即可看見「會員中心」的選項，點擊後即可看見「演唱會及票券」的選項，點擊後即可看見您的電子票券。",
    link: "/question/detail?faqType=ticket",
    type: "ticket",
  },
  {
    title: "如何註冊會員",
    content:
      "請先至Tickeasy樂票網首頁，點選右上方的註冊，進入註冊頁面後，填寫相關表格內容，建立您的Tickeasy樂票網帳號，完成後即可至登入頁面進行會員登入。",
    link: "/question/detail?faqType=member",
    type: "member",
  },
  {
    title: "如何登入會員",
    content:
      "請先至Tickeasy樂票網首頁，點選右上方的登入，進入登入頁面後，輸入註冊時的電子郵件Email與密碼後進行登入，或者也可直接使用Google帳號登入。",
    link: "/question/detail?faqType=member",
    type: "member",
  },
  {
    title: "忘記密碼怎麼辦",
    content:
      "請至登入頁面點選頁面表格下方的「忘記密碼」，點擊後，會彈出視窗，請您輸入註冊時的電子郵件Email，系統則會寄出信件協助您更新密碼，您可使用新密碼登入後再自行至個人設定中修改密碼。",
    link: "/question/detail?faqType=member",
    type: "member",
  },
  {
    title: "如何舉辦演唱會",
    content: "請於登入會員後，點擊右上方的帳號，即可看見「舉辦演唱會」的選項，點擊後即可進行演唱會的舉辦。",
    link: "/question/detail?faqType=member",
    type: "member",
  },
];
export default function QuestionNormalList() {
  return (
    <>
      <div className="flex w-full flex-col justify-center lg:my-4">
        <h3 className="hidden lg:block">常見問題列表</h3>
        <div>
          {faqs.map((faq) => (
            <QuestionNormalListItem key={faq.title} title={faq.title} content={faq.content} href={faq.link} type={faq.type as QuestionType} />
          ))}
        </div>
      </div>
    </>
  );
}
