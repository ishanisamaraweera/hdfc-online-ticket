import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { IMAGE_PATH } from "../../properties";
import { GiCheckMark } from "react-icons/gi";
import { ImRadioChecked } from "react-icons/im";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const MediaList = ({ item, index, deleteFile, changeFeatured }) => {
  const uri = item?.url;
  return (
    <div className="file_list">
      <AiOutlineDelete className="icon" onClick={() => deleteFile(index)} />

      {item.isFeatured ? (
        <GiCheckMark
          className="featured"
          onClick={() => changeFeatured(index)}
        />
      ) : (
        item.resourceType === "IMAGE" && (
          <ImRadioChecked
            className="notFeatured"
            onClick={() => changeFeatured(index)}
          />
        )
      )}

      {item.resourceType === "IMAGE" && (
        <img src={IMAGE_PATH + "/" + uri} alt="" className="item_img_box" />
      )}

      {item.resourceType === "APPLICATION" && (
        <div className="up_image_view">
          <Document file={IMAGE_PATH + "/" + uri}>
            <Page pageNumber={1} scale={0.3} />
          </Document>
        </div>
      )}

      {item.resourceType === "VIDEO" && (
        <video controls className="up_image_view">
          <source src={IMAGE_PATH + "/" + uri} type="video/mp4" />
        </video>
      )}
    </div>
  );
};
