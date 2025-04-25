import footerBlock from "@/assets/images/footerBlock.jpg";

export default function Footer() {
  return (
    <>
    {/* 電腦版 */}
      <footer
        style={{ backgroundImage: `url(${footerBlock})` }}
        className=" bg-contain bg-bottom bg-no-repeat h-[500px] mt-20 mx-auto hidden lg:block lg:bg-contain">
        <div className="container mx-auto px-4 py-8">
          <div className="row">
            {/* Footer content goes here */}
          </div>
        </div>
      </footer>

      {/* 手機版 */}
      <footer className="bg-neutral-100 h-[200px] mt-20 mx-auto block lg:hidden">
        <div className="container mx-auto px-4 py-8">
          <div className="row">
            {/* Footer content goes here */}
          </div>
        </div>
      </footer>
    </>
  );
}
