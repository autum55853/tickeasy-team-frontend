import { Button } from "@/core/components/ui/button";
import { QuestionType } from "../../types/question";
import { useQuestionDetail } from "../../hook/useQuestionDetailContext";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
const faqDetails = {
  concert: ["如何查看所有演唱會資訊", "如何查看單一演唱會詳細資訊", "如何報名參加演唱會"],
  ticket: ["我的電子票券在哪裡查看", "如何購票", "如何取票", "支援那些付款方式", "如何退票"],
  member: ["如何註冊會員", "如何登入會員", "忘記密碼怎麼辦", "如何修改個人資料", "如何修改密碼", "如何舉辦演唱會"],
};

export default function QuestionDetailSidebar({ faqType }: { faqType: QuestionType }) {
  const { activeQuestion, setActiveQuestion } = useQuestionDetail();
  const handleClick = (question: string) => {
    setActiveQuestion(question);
  };
  useEffect(() => {
    if (!activeQuestion) {
      setActiveQuestion(faqDetails[faqType][0]);
    }
  }, [faqType]);
  return (
    <>
      <div className="mx-auto my-8 flex max-w-[1075px] justify-center gap-4">
        <ul>
          {faqDetails[faqType].map((faq, index) => (
            <li key={index} className="text-start">
              <Button variant="ghost" onClick={() => handleClick(faq)}>
                {faq}
                <Icon icon="line-md:question-circle" className="text-grey-500 h-6 w-6" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
