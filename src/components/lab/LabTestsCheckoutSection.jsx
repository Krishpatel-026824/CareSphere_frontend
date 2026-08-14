import BillingBillDetails from '../billing/BillingBillDetails'
import BillingOrderStatus from '../billing/BillingOrderStatus'
import BillingPaymentCard from '../billing/BillingPaymentCard'
import { labTestsBillingMock } from '../../data/mocks/labTestsBilling'
import { rupee } from '../../utils/rupee'

export default function LabTestsCheckoutSection({
  bill,
  paymentMethod,
  onPaymentChange,
  paid,
  onPay,
  onAddMore,
}) {
  if (bill.itemCount === 0) return null

  const lines = bill.lines.map((line) => ({
    id: line.id,
    label: line.name,
    quantity: line.quantity,
    lineTotal: line.lineTotal,
  }))

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-4 items-start">
      <div className="flex flex-col gap-4">
        <BillingOrderStatus
          steps={labTestsBillingMock.orderSteps}
          completedCount={paid ? labTestsBillingMock.orderSteps.length : 1}
          estimateLabel={labTestsBillingMock.estimateLabel}
          estimateValue={labTestsBillingMock.estimateValue}
        />
        <BillingBillDetails
          lines={lines}
          breakdown={[
            { label: 'Patient', value: labTestsBillingMock.patientName },
            { label: 'Test total', value: rupee(bill.subtotal) },
            {
              label: 'Home collection',
              value: bill.collectionFee === 0 ? 'Free' : rupee(bill.collectionFee),
            },
            { label: `GST (${bill.taxPercent}%)`, value: rupee(bill.tax) },
          ]}
          itemCount={bill.itemCount}
          itemCountLabel="Tests booked"
          total={bill.total}
        />
      </div>
      <BillingPaymentCard
        total={bill.total}
        methods={labTestsBillingMock.paymentMethods}
        paymentMethod={paymentMethod}
        onPaymentChange={onPaymentChange}
        paid={paid}
        onPay={onPay}
        onAddMore={onAddMore}
        radioName="lab-payment"
      />
    </div>
  )
}
