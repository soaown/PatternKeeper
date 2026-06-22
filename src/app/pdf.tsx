import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import patternAnalysis from "../data/patternAnalysis.json";
import { patternThreads } from '../data/patternThreads';


export default function PdfScreen() {
    const { uri } =
        useLocalSearchParams<{
            uri?: string;
            name?: string;
        }>();

    const [isPanelOpen, setIsPanelOpen] =
        useState(true);

    const [selectedSymbol, setSelectedSymbol] =
        useState<string | null>(null);

    const pdfSource =
        uri === 'sample' || !uri
            ? require('../../assets/sample.pdf')
            : { uri };

    return (
        <View style={styles.container}>
            <WebView
                source={pdfSource}
                style={styles.pdf}
                originWhitelist={['*']}
                scalesPageToFit={true}
            />

            <View style={styles.gridPreview}>
                {patternAnalysis.grid.slice(0, 20).map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.gridRow}>
                        {row.map((cell) => {
                            const isHighlighted =
                                selectedSymbol === cell.symbol;

                            return (
                                <View
                                    key={`${cell.row}-${cell.col}`}
                                    style={[
                                        styles.gridCell,
                                        isHighlighted && styles.highlightedCell,
                                    ]}
                                >
                                    <Text style={styles.gridSymbol}>
                                        {cell.symbol}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                ))}
            </View>

            <Pressable
                style={styles.panelToggleButton}
                onPress={() =>
                    setIsPanelOpen((prev) => !prev)
                }
            >
                <Text style={styles.panelToggleText}>
                    {isPanelOpen ? '›' : '‹'}
                </Text>
            </Pressable>

            {
                isPanelOpen ? (
                    <View style={styles.threadPanel}>
                        {patternThreads.map((item) => (
                            <Pressable
                                key={item.symbol}
                                style={[
                                    styles.threadItem,
                                    selectedSymbol === item.symbol &&
                                    styles.threadItemActive,
                                ]}
                                onPress={() =>
                                    setSelectedSymbol((prev) =>
                                        prev === item.symbol ? null : item.symbol
                                    )
                                }
                            >
                                <View
                                    style={[
                                        styles.threadColorBar,
                                        { backgroundColor: item.color },
                                    ]}
                                />

                                <Text style={styles.threadSymbol}>
                                    {item.symbol}
                                </Text>

                                <View style={styles.threadTextBox}>
                                    <Text style={styles.threadCode}>
                                        {item.thread}
                                    </Text>
                                    <Text style={styles.threadName}>
                                        {item.name}
                                    </Text>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                ) : null
            }
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    pdf: {
        flex: 1,
    },

    panelToggleButton: {
        position: 'absolute',
        top: 60,
        right: 0,
        width: 34,
        height: 44,
        backgroundColor: '#f4f4f4',
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 30,
    },

    panelToggleText: {
        fontSize: 28,
        fontWeight: '700',
    },

    threadPanel: {
        position: 'absolute',
        top: 104,
        right: 0,
        bottom: 0,
        width: 190,
        backgroundColor: '#fff',
        borderLeftWidth: 1,
        borderColor: '#ddd',
        zIndex: 20,
    },

    threadItem: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 64,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    },

    threadItemActive: {
        backgroundColor: 'rgba(0, 180, 120, 0.22)',
    },

    threadColorBar: {
        width: 8,
        height: '100%',
        marginRight: 8,
    },

    threadSymbol: {
        width: 28,
        fontSize: 20,
        textAlign: 'center',
    },

    threadTextBox: {
        flex: 1,
    },

    threadCode: {
        fontSize: 15,
        fontWeight: '700',
    },

    threadName: {
        fontSize: 12,
        color: '#666',
    },
    gridPreview: {
        position: 'absolute',
        left: 8,
        bottom: 20,
        padding: 6,
        backgroundColor: '#fff',
        zIndex: 10,
    },

    gridRow: {
        flexDirection: 'row',
    },

    gridCell: {
        width: 9,
        height: 9,
        borderWidth: 0.3,
        borderColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },

    highlightedCell: {
        backgroundColor: 'yellow',
    },

    gridSymbol: {
        fontSize: 5,
    },
});
