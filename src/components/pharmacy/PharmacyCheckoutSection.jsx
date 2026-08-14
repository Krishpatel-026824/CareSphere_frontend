import BillingBillDetails from '../billing/BillingBillDetails'
import BillingOrderStatus from '../billing/BillingOrderStatus'
import BillingPaymentCard from '../billing/BillingPaymentCard'
import { pharmacyBillingMock } from '../../data/mocks/pharmacyBilling'
import { usePharmacyDeliveryEstimate } from '../../hooks/usePharmacyDeliveryEstimate'
import { rupee } from '../../utils/rupee'

export default function PharmacyCheckoutSection({
  bill,
  paymentMethod,
  onPaymentChange,
  paid,
  onPay,
  onAddMore,
}) {
  const deliveryEstimate = usePharmacyDeliveryEstimate()
  if (bill.itemCount === 0) return null

  const lines = bill.lines.map((line) => ({
    id: line.id,
    label: `${line.name.replace(/\s+\d+mg$/, '')} x${line.quantity}`,
    quantity: line.quantity,
    lineTotal: line.lineTotal,
  }))

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-4 items-start">
      <div className="flex flex-col gap-4">
        <BillingOrderStatus
          steps={pharmacyBillingMock.orderSteps}
          completedCount={paid ? pharmacyBillingMock.orderSteps.length : 1}
          estimateLabel={pharmacyBillingMock.estimateLabel}
          estimateValue={deliveryEstimate}
        />
        <BillingBillDetails
          lines={lines}
          breakdown={[
            { label: 'Medicine Total', value: rupee(bill.subtotal) },
            { label: 'Delivery', value: rupee(bill.deliveryFee) },
            { label: `GST (${bill.taxPercent}%)`, value: rupee(bill.tax) },
          ]}
          itemCount={bill.itemCount}
          itemCountLabel="Items in Cart"
          total={bill.total}
        />
      </div>
      <BillingPaymentCard
        total={bill.total}
        methods={pharmacyBillingMock.paymentMethods}
        paymentMethod={paymentMethod}
        onPaymentChange={onPaymentChange}
        paid={paid}
        onPay={onPay}
        onAddMore={onAddMore}
        radioName="pharmacy-payment"
      />
    </div>
  )
}
