import PDFMerger from 'pdf-merger-js/browser';
import './App.css';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

function JournalMaker() {
  return (
    <div className="JournalMaker">
        <RangePicker picker="month" />
    </div>
  );
}

export default JournalMaker;
