import React, { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import { priceFormat } from '../../../helpers/helpers';
import useDarkMode from '../../../hooks/useDarkMode';
import { demoPagesMenu } from '../../../menu';

type TStatus = 'Succed' | 'Pending' | 'Failed';

interface ITransactionsItemProps {
	blockNumber: number;
	timeStamp: string;
	hash: string;
	nonce: number;
	blockHash: string;
	transactionIndex: number;
}

const txHashToExplorer = (hash:string) => {
	return `https://goerli.etherscan.io/tx/${hash}`
}

const timeStampToDate = (tm:any) => {
	const date = new Date(tm*1000);
	const options = { year: 'string', month: 'long', day: 'numeric' };
	const formattedDate = new Intl.DateTimeFormat('en-US').format(date);
	return `${formattedDate} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}


const TransactionsItem: FC<ITransactionsItemProps> = ({ blockNumber, timeStamp, hash, nonce, blockHash, transactionIndex }) => {
	const { darkModeStatus } = useDarkMode();
	
	const STATUS =
		(status === 'Succed' && 'success') ||
		(status === 'Pending' && 'warning') ||
		(status === 'Failed' && 'danger');
	return (
		<div key={hash} className='col-12'>
			<div className='row'>
				<div className='col d-flex align-items-center'>
					<div className='flex-shrink-0'>
						<div
							style={{ width: 100 }}
							className={classNames(
								`bg-l${darkModeStatus ? 'o25' : '10'
								}-${STATUS} text-${STATUS} fw-bold py-2 rounded-pill me-3 text-center`,
							)}>
							{status}
						</div>
					</div>
					<div className='flex-grow-1'>
						<div className='fs-6'>{timeStampToDate(timeStamp)}</div>
						<div className='text-muted'>
							<small><a target="_blank" href={txHashToExplorer(hash)}>{hash.slice(0,6)+ '...' + hash.substring(hash.length - 5)}</a></small>
						</div>
					</div>
				</div>
				<div className='col-auto text-end'>
					<div>
					{/* 	<strong>{priceFormat(price)}</strong> */}
						<strong>Block {blockNumber}</strong>
					</div>
					<div className='text-muted'>
						<small>Nonce {nonce}</small>
					</div>
				</div>
			</div>
		</div>
	);
};


const CommonLatestTransActions = () => {
	const [userData, setUserData] = useState<ITransactionsItemProps[]>([]);
	const api_url = new URL('https://api-goerli.etherscan.io/api?module=account&action=tokentx&contractaddress=0x61b619fF6A4b198833b77f5DCa65674DA805C647&page=1&offset=100&sort=asc&apikey=Z44D1BPXP6NVZVUERH1ICBJ91UJIS1YWC6');
	useEffect(() => {
		(async function () {
			const response = await fetch(api_url.toString());
			const data = await response.json()
			console.log(data)
			setUserData(data.result) 		
		})()	
		console.log(userData)
	}, []);
	const transactionsData: ITransactionsItemProps[] = [
		...userData,
	];
	return (
		<Card stretch>
			<CardHeader>
				<CardLabel>
					<CardTitle tag='div' className='h5'>
						Latest Transactions
					</CardTitle>
				</CardLabel>
				<CardActions>
					<Button
						color='info'
						isLink
						icon='Summarize'
						tag='a'
						to={`../${demoPagesMenu.sales.subMenu.transactions.path}`}>
						All Transactions
					</Button>
				</CardActions>
			</CardHeader>
			<CardBody isScrollable>
				<div className='row g-4'>
					{transactionsData.map((el:ITransactionsItemProps) => (
						// eslint-disable-next-line react/jsx-props-no-spreading
						<TransactionsItem {...el}/>
					))}
				</div>
			</CardBody>
		</Card>
	);
};

export default CommonLatestTransActions;
