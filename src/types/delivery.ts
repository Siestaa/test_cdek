export interface Delivery {
	entity: {
		uuid: string
		cdek_number: string
		number: string
		comment: string
		shipment_point: string
		delivery_point: string
		sender: {
			company: string
			name: string
		}
		recipient: {
			company: string
			name: string
			phones: { number: string }[]
		}
		from_location: {
			city: string
			address: string
		}
		to_location: {
			city: string
			address: string
		}
		statuses: {
			code: string
			name: string
			date_time: string
			city: string
		}[]
		packages: {
			number: string
			barcode: string
			weight: number
			items: {
				name: string
				ware_key: string
				cost: number
				amount: number
			}[]
		}[]
		services: {
			code: string
			total_sum: number
		}[]
	}
	related_entities: any[]
}

export interface Filters {
	status: string
}
