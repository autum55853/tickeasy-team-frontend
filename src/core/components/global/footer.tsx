import footerBlock from "@/assets/images/footerBlock.jpg";
import DeaktopLogo from "@/assets/images/logo-bg.png";
import MobileLogo from "@/assets/images/logo.png";
import { Icon } from "@iconify-icon/react";
export default function Footer() {
  return (
    <>
      {/* 電腦版 */}
      <footer
        style={{
          backgroundImage: `url(${footerBlock})`,
        }}
        className="mx-auto mt-20 hidden min-h-[450px] bg-cover bg-bottom bg-no-repeat pt-[170px] lg:block"
      >
        <div className="container mx-auto flex h-[240px]">
          {/* 左半區 */}
          <div className="w-[50%]">
            <div className="ml-auto grid h-full w-[70%] grid-cols-2 grid-rows-3 gap-y-3">
              <img className="col-span-2 ml-8 max-w-[320px]" src={DeaktopLogo} alt="Logo" />
              <p className="mt-4">tickeasy@email.com</p>
              <p className="mt-4">週一至週五 10:00~17:00</p>
              <div className="col-span-2 mx-4 border-t border-neutral-200 pt-4">樂票網股份有限公司 © Tickeasy. All Rights Reserved.</div>
            </div>
          </div>
          {/* 右半區 */}
          <div className="w-[50%]">
            <div className="ml-40 grid h-full w-[70%] grid-cols-3">
              <div className="col-span-3 mt-8 flex justify-center gap-x-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white">
                  <Icon icon="my-line" className="text-[40px]" />
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white">
                  <Icon icon="my-facebook" className="text-[40px]" />
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white">
                  <Icon icon="my-youtube" className="text-[28px]" />
                </div>
              </div>
              <p className="empty"></p>
              <p>常見問題</p>
              <p>隱私權政策</p>
              <div className="col-span-3"></div>
            </div>
          </div>
        </div>
      </footer>

      {/* 手機版 */}
      <footer className="mx-auto mt-10 block bg-neutral-100 lg:hidden">
        <div className="grid grid-cols-6 gap-y-4 py-10">
          <div className="col-span-6">
            <img className="mx-auto" src={MobileLogo} alt="Logo" />
          </div>
          <div className="col-span-6 space-y-1 text-center">
            <p>tickeasy@email.com</p>
            <p>週一至週五 10:00~17:00</p>
          </div>
          <div className="col-span-6 flex justify-center gap-x-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white">
              <Icon icon="my-line" className="text-[40px]" />
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white">
              <Icon icon="my-facebook" className="text-[40px]" />
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white">
              <Icon icon="my-youtube" className="text-[28px]" />
            </div>
          </div>
          <div className="col-span-3 mx-4 text-right">常見問題</div>
          <div className="col-span-3 mx-4 text-left">隠私權政策</div>
          <div className="col-span-6 mx-4 border-t border-neutral-200 pt-4 text-center">樂票網股份有限公司 © Tickeasy. All Rights Reserved.</div>
        </div>
      </footer>
    </>
  );
}
