import React, { useState } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import './JournalMaker.css';

import JournalPanel from './JournalPanel';
import OptionsPanel from './OptionsPanel';


function JournalMaker() {
  const now = moment().startOf('month');
  const later = now.clone().add(2, 'M');
  const nowToLater = [now, later];

  const [settings, setSettings] = useState({
        date_range: nowToLater,
        insert_affirmations: false,
        insert_day: true,
        insert_week: true,
        insert_month: true
      });
  const [isGenerating, setIsGenerating] = useState(true);

  return (
    // style={{margin: '50px 0px'}}
    <Row className="Journal-Maker">
      <Col xs={24} sm={24} md={8} lg={8} xl={8} >
        <OptionsPanel
          initialValues={settings}
          onSubmit={setSettings}
          isGenerating={isGenerating} />
      </Col>
      <Col xs={24} sm={24} md={16} lg={16} xl={16}>
        <JournalPanel
          settings={settings}
          setIsGenerating={setIsGenerating} />
      </Col>
    </Row>
  );
}

export default JournalMaker;
