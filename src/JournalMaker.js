import PDFMerger from 'pdf-merger-js/browser';
import React, { useEffect, useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import moment from 'moment';
import { DatePicker } from 'antd';


import userInfo from "./journal/user-info.pdf";
import dayLeft from "./journal/day-left.pdf";
import dayRight from "./journal/day-right.pdf";

const { RangePicker } = DatePicker;

const Merger = ({files}) => {
  const [mergedPdfUrl, setMergedPdfUrl] = useState();

  useEffect(() => {
    const render = async () => {
      const merger = new PDFMerger();

      for (const file of files) {
        const res = await window.fetch(file)
        const ab = await res.blob()
        await merger.add(ab)
      }

      const mergedPdf = await merger.saveAsBlob();
      const url = URL.createObjectURL(mergedPdf);
      console.log(url);

      return setMergedPdfUrl(url);
    };

    render().catch((err) => {
      throw err;
    });

    return () => setMergedPdfUrl({});
  }, [files, setMergedPdfUrl]);

  return !mergedPdfUrl ? (
    <>Loading</>
  ) : (
    <iframe
      height={1000}
      width={800}
      src={`${mergedPdfUrl}`}
      title='pdf-viewer'
      style={{resize: 'both', overflow: 'auto'}}
    ></iframe>
  );
};

function JournalMaker() {
  const now = moment();
  const later = now.add(2, 'M');
  const nowToLater = [now, later];
  const [dateRange, setDateRange] = useState(nowToLater);

  let files = [userInfo];
  const daysBetween = dateRange[1].diff(dateRange[0], 'days');
  for (let i = 0; i < daysBetween; i ++) {
      files.push(dayLeft);
      files.push(dayRight);
  }

  return (
    <div className="JournalMaker">
        <div style={{margin: '50px 50px'}}>
          <p>Planner months:</p>
            <RangePicker
                picker="month"
                value={dateRange}
                onChange={setDateRange} />
        </div>
        <div>
            <Merger files={files} />
        </div>
    </div>
  );
}

export default JournalMaker;
