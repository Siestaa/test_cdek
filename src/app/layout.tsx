import { DeliveryProvider } from "@/context/DeliveryContext"
import "@/styles/globals.css"
import { ReactNode } from "react"

export const metadata = {
	title: "Delivery App",
	description: "Приложение для управления доставками",
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="ru">
			<body>
				<DeliveryProvider>{children}</DeliveryProvider>
			</body>
		</html>
	)
}