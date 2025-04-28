import { VenueCardProps } from "../types/VenueCard";
import map1 from "@/assets/images/map1.jpg";
import map2 from "@/assets/images/map2.jpg";
import map3 from "@/assets/images/map3.jpg";

export const VenueCardData: VenueCardProps[] = [
  {
    idx: 0,
    title: "台北國家音樂廳",
    image: map1,
    description: "台北國家音樂廳是一座世界級的音樂殿堂，擁有卓越的聲學設計和現代化的設施，常年舉辦各類古典音樂會和演出活動。",
    address: "台北市中正區中山南路21-1號",
    capacity: "2000",
    CanBus: true,
    CanParking: true,
    Wheelchair: true,
  },
  {
    idx: 1,
    title: "高雄巨蛋體育館",
    image: map2,
    description: "高雄巨蛋體育館是一座多功能體育場館，可舉辦大型演唱會、體育賽事和文化活動，擁有一流的音響和燈光系統。",
    address: "高雄市左營區博愛二路777號",
    capacity: "15000",
    CanBus: true,
    CanParking: true,
    Wheelchair: true,
  },
  {
    idx: 2,
    title: "台中歌劇院",
    image: map3,
    description: "台中歌劇院以其精緻的內部裝潢和完美的視聽效果而聞名，是舉辦戲劇、音樂劇和小型音樂會的理想場所。",
    address: "台中市西屯區惠來路二段101號",
    capacity: "2000",
    CanBus: false,
    CanParking: true,
    Wheelchair: true,
  },
];
