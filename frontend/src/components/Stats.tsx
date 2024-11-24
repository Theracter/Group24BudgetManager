import PieChart from './PieChart.tsx'
import { ProgressBar } from './ProgessBar.tsx';
import './Stats.css';

export default function Stats() {
    return (
        <>
            <div className='infoBreakdown'>
                <div className='pie_chart_container'>
                    <h3 className='subTitle'>Breakdown</h3>
                    <PieChart />
                </div>
                <div className='info1'>
                    <div className='progress'>
                        <h3 className='subTitle'>Status </h3><br />
                        <ProgressBar currentValue={100} maxValue={200}></ProgressBar>
                        <p className='numbers'>$100/$200.00</p><br />
                    </div>
                    <div className='items'>
                        <ol className='list'>
                            <li>Gas: $100/$100</li>
                            <li>thing</li>
                            <li>thing</li>
                            <li>thing</li>
                            <li>thing</li>
                        </ol>
                    </div>
                </div>
            </div>
        </>
    );
};