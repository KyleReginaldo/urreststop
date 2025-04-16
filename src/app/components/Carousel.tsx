import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import * as React from "react";
import carousel1 from "../../../public/images/carousel1.jpg";
import carousel2 from "../../../public/images/carousel2.jpg";
import carousel3 from "../../../public/images/carousel3.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function LoginCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, playOnInit: true })
  );
  const images = [carousel1, carousel2, carousel3];

  return (
    <Carousel
      plugins={[plugin.current]}
      className=""
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((item, index) => (
          <CarouselItem key={index}>
            <Image src={item} alt={item.src} className="-cover" />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
