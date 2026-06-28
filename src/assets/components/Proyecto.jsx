import React, { Component } from "react";

export default class Proyecto extends Component {
  render() {
    return (
      <div
        className="bg-gray-950  text-white flex flex-col items-center gap-6 px-4 py-5 md:flex-row md:gap-8 rounded-2xl
      border"
      >
        <div>
          <img
            className="size-70 shadow-xl rounded-md"
            alt=""
            src="/img/cover.png"
          />
        </div>
        <div className="flex flex-col gap-3 text-center md:text-start md:items-start">
          <span className="text-2xl font-medium">Proyecto 1</span>
          <span className="font-light text-sm text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque culpa
            nulla et! Temporibus soluta tenetur, consequatur vero fugit
            molestiae nam dolorum explicabo voluptas magnam, ut magni ea maiores
            labore dolore.
          </span>
          <span className="flex items-center gap-2 font-light text-violet-400">
            <span>No. 4</span>
            <span>·</span>
            <span>2025</span>
          </span>
        </div>
      </div>
    );
  }
}
