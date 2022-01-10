import { pdf } from '@react-pdf/renderer';
import { Skeleton } from 'antd';
import PDFMerger from 'pdf-merger-js/browser';
import React, { useEffect, useState } from 'react';
import downloadIcon from '../download.png';
import affirmationsPage from "../journal/affirmations.pdf";
import blankPage from "../journal/blank.pdf";
import dayLeftPage from "../journal/day-left.pdf";
import dayRightPage from "../journal/day-right.pdf";
import userInfoPage from "../journal/user-info.pdf";
import weekPage from "../journal/week.pdf";
import CoverPagePDF from "./CoverPagePDF";


function buildWeeklyPages(settings) {
    const pages = [];

    // 1. Weekly insert
    if (settings.insert_week) {
        pages.push(weekPage);
    }

    // 2. Daily
    if (settings.insert_day) {
        for (let i = 0; i < 7; i++) {
            pages.push(dayLeftPage);
            pages.push(dayRightPage);
        }
    }

    return pages;
}

async function buildJournal(settings) {
    const start = settings.date_range[0].startOf('week');
    const end = settings.date_range[1].startOf('week');

    // Build journal
    const pages = [];

    // 1. Cover 
    const coverPageElement = <CoverPagePDF startDate={start} endDate={end} />;
    const coverPageBlob = await pdf(coverPageElement).toBlob();
    // const coverPage = await coverPageBlob.arrayBuffer();
    const coverPage = URL.createObjectURL(coverPageBlob);
    pages.push(coverPage);
    pages.push(blankPage);

    // 2. User info
    pages.push(userInfoPage);

    // 3. Affirmations
    if (settings.insert_affirmations) {
        pages.push(affirmationsPage);
        pages.push(dayRightPage);
    }

    // 3. Per week
    const weeksToAdd = end.diff(start, 'week') + 1;
    // >> Monthly insert?
    if (settings.insert_month) {
        // .... insert right away.
    }

    let lastMonth = start.month();
    for (let i = 0; i < weeksToAdd; i++) {
        const currentDate = start.clone().add(1, 'week');
        const currentMonth = currentDate.month();

        // (if beginning of next date is different)
        if (currentMonth !== lastMonth && settings.insert_month) {
            // ... insert monthly
            lastMonth = currentMonth;
        }

        const weeklyPages = buildWeeklyPages(settings);
        pages.push(...weeklyPages);
    }

    // Merge all files
    const merger = new PDFMerger();

    for (const file of pages) {
        const res = await window.fetch(file)
        const ab = await res.blob()
        await merger.add(ab)
    }

    // Save as pdf
    const mergedPdf = await merger.saveAsBlob();
    const url = URL.createObjectURL(mergedPdf);

    return url;
}


const JournalPanel = ({ settings, setIsGenerating }) => {
    const [mergedPdfUrl, setMergedPdfUrl] = useState();
    
    useEffect(() => {
        setIsGenerating(true);

        buildJournal(settings).catch((err) => {
            throw err;
        }).then(setMergedPdfUrl).then(() => {
            setIsGenerating(false);
        });

        return () => setMergedPdfUrl();
    }, [settings, setMergedPdfUrl, setIsGenerating]);

    return !mergedPdfUrl ? 
        (
            <div style={{
                background: '#525659',
                width: '100%',
                height: 1000,
                maxWidth: '1000px' }}>
                <Skeleton.Input
                    active={true}/>
            </div>
        ) : 
        (
            <div>
                <iframe
                    height={1000}
                    width='100%'
                    src={`${mergedPdfUrl}`}
                    title='pdf-viewer'
                ></iframe>
                <p style={{textAlign: 'center'}}>
                    <a className="Planner-Link"
                        href={mergedPdfUrl}
                        download="my-performance-planner.pdf">
                        my-performance-planner.pdf&nbsp;
                        <img src={downloadIcon}
                            alt="download"
                            style={{width: '16px', paddingBottom: '4px'}}/>
                    </a>
                </p>
            </div>
        );
};

export default JournalPanel;