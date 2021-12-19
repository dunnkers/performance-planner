import React, { useState } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';

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
    <Row style={{margin: '50px 0px'}} gutter={32}>
      <Col span={8}>
        <OptionsPanel
          initialValues={settings}
          onSubmit={setSettings}
          isGenerating={isGenerating} />
      </Col>
      <Col span={16}>
        <JournalPanel
          settings={settings}
          setIsGenerating={setIsGenerating} />
      </Col>
    </Row>
  );
}

export default JournalMaker;
