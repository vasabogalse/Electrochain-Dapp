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
import data from '../../../common/data/dummyEventsData';

//const api_url = new URL('https://api.etherscan.io/api?module=account&action=txlist&address=0x1eEB5efeaA5CaeA8594D5b35E7912f230a1703A9&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=Z44D1BPXP6NVZVUERH1ICBJ91UJIS1YWC6');
const api_url = new URL('https://api-goerli.etherscan.io/api?module=account&action=tokentx&contractaddress=0x61b619fF6A4b198833b77f5DCa65674DA805C647&page=1&offset=100&sort=asc&apikey=Z44D1BPXP6NVZVUERH1ICBJ91UJIS1YWC6');

const TXData = (async function () {
	const response = await fetch(api_url.toString());
	const data = await response.json();
	console.log(data)
})()







type TStatus = 'Succed' | 'Pending' | 'Failed';
/* interface ITransactionsItemProps {
	id: number;
	date: string;
	status: TStatus;
	email: string;
	price: number;
	tax: number;
} */

interface ITransactionsItemProps {
	blockNumber: number;
	timeStamp: string;
	hash: string;
	nonce: number;
	blockHash: string;
	transactionIndex: number;
}


const TransactionsItem: FC<ITransactionsItemProps> = ({ blockNumber, timeStamp, hash, nonce, blockHash, transactionIndex }) => {
	const { darkModeStatus } = useDarkMode();
	const [userData, setUserData] = useState<any>([]);
	useEffect(() => {
		const TXData:any = (async function () {
			const response = await fetch(api_url.toString());
			console.log('useEffect')
			setUserData(await response.json()) 
			console.log(userData)
		})()	
	}, []);

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
						<div className='fs-6'>{timeStamp}</div>
						<div className='text-muted'>
							<small>{hash}</small>
						</div>
					</div>
				</div>
				<div className='col-auto text-end'>
					<div>
					{/* 	<strong>{priceFormat(price)}</strong> */}
						<strong>{blockHash}</strong>
					</div>
					<div className='text-muted'>
						<small>Tax {nonce}</small>
					</div>
				</div>
			</div>
		</div>
	);
};


const CommonLatestTransActions = () => {
	const transactionsData: ITransactionsItemProps[] = [
		data
		/* {
			id: 1,
			date: dayjs().format('ll'),
			status: 'Succed',
			email: 'prueba@facit.com',
			price: 34,
			tax: 7.6,
		},
		{
			id: 2,
			date: dayjs().add(-1, 'day').format('ll'),
			status: 'Pending',
			email: 'grace@facit.com',
			price: 24,
			tax: 5.4,
		},
		{
			id: 3,
			date: dayjs().add(-2, 'day').format('ll'),
			status: 'Succed',
			email: 'jane@facit.com',
			price: 75,
			tax: 18,
		},
		{
			id: 4,
			date: dayjs().add(-2, 'day').format('ll'),
			status: 'Succed',
			email: 'grace@facit.com',
			price: 43,
			tax: 9.2,
		},
		{
			id: 5,
			date: dayjs().add(-3, 'day').format('ll'),
			status: 'Failed',
			email: 'ryan@facit.com',
			price: 48,
			tax: 11,
		},
		{
			id: 6,
			date: dayjs().add(-3, 'day').format('ll'),
			status: 'Succed',
			email: 'sam@facit.com',
			price: 64,
			tax: 15.4,
		},
		{
			id: 7,
			date: dayjs().add(-3, 'day').format('ll'),
			status: 'Pending',
			email: 'ella@facit.com',
			price: 78,
			tax: 18,
		}, */
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
					{transactionsData.map((i) => (
						// eslint-disable-next-line react/jsx-props-no-spreading
						<TransactionsItem key={i.id} {...i} />
					))}
				</div>
			</CardBody>
		</Card>
	);
};

export default CommonLatestTransActions;
