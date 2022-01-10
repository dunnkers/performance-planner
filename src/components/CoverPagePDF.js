import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import Montserrat from "../fonts/Montserrat-Regular.ttf"

// Montserrat
Font.register({ family: 'Montserrat', src: Montserrat });

// Create styles
const styles = StyleSheet.create({
  page: {
    textAlign: 'center',
    padding: 50,
    paddingTop: 100,
    fontFamily: 'Montserrat'
  },
  title: {
    fontSize: 24
  },
  subTitle: {
      fontSize: 15,
      color: 'rgb(70 70 70)'
  }
});

// Create Document Component
const CoverPagePDF = ({ startDate, endDate }) => {
    // Year header
    const yearIsSame = startDate.year() === endDate.year();
    const bothYearsText = `${startDate.year()} - ${endDate.year()}`;
    const yearText = yearIsSame ? startDate.year() : bothYearsText;

    // Month subheader
    const startMonth = startDate.format("MMMM");
    const endMonth = endDate.format("MMMM");
    const monthText = `${startMonth} — ${endMonth}`;

    return (
        <Document>
          <Page size="A5" style={styles.page}>
            <View style={styles.title}>
              <Text>{yearText}</Text>
            </View>
            <View style={styles.subTitle}>
              <Text>{monthText}</Text>
            </View>
          </Page>
        </Document>
    )
};

export default CoverPagePDF;