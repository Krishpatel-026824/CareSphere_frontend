import { useAppointmentSettings } from '../../hooks/useAppointmentSettings'
import SettingsToggleRow from './SettingsToggleRow'

export default function AppointmentSettingsTab({ appointment, doctor }) {
  const { settings, toggles, toggle, reminderTiming, setReminderTiming } = useAppointmentSettings(
    appointment,
    doctor,
  )

  return (
    <div className="flex-1 min-h-0 min-w-0 overflow-y-auto p-4 sm:p-5 lg:p-6">
      <div className="w-full max-w-4xl space-y-5">
        <div>
          <h2 className="text-[20px] font-bold tracking-tight text-[#1E2124]">Settings</h2>
          <p className="mt-1 text-sm text-[#6B7280]">{settings.subtitle}</p>
        </div>

        <section className="flex items-center gap-3 rounded-xl border border-[#E6E8EC] bg-[#F8FAFC] px-3.5 py-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#EEF2F6]">
            <img
              src={settings.photo}
              alt={settings.doctorName}
              className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#1E2124]">{settings.doctorName}</p>
            <p className="truncate text-[12px] text-[#6B7280]">
              {settings.specialty} • {settings.clinic}
            </p>
            <p className="text-[12px] text-[#8A8F98]">
              {settings.dateLabel} · {settings.timeLabel}
            </p>
          </div>
        </section>

        {settings.completed ? (
          <p className="rounded-xl bg-[#F3F4F6] px-3.5 py-2.5 text-[12px] text-[#6B7280]">
            This visit is completed. Preferences are saved for your next follow-up.
          </p>
        ) : null}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <SettingsGroup title="Notifications">
            {settings.notifications.map((item) => (
              <SettingsToggleRow
                key={item.id}
                item={item}
                checked={Boolean(toggles[item.id])}
                disabled={settings.completed}
                onToggle={toggle}
              />
            ))}
          </SettingsGroup>

          {settings.extras.length > 0 ? (
            <SettingsGroup title="Visit prep">
              {settings.extras.map((item) => (
                <SettingsToggleRow
                  key={item.id}
                  item={item}
                  checked={Boolean(toggles[item.id])}
                  disabled={settings.completed}
                  onToggle={toggle}
                />
              ))}
            </SettingsGroup>
          ) : null}
        </div>

        <div>
          <h3 className="mb-2 text-[13px] font-semibold text-[#1E2124]">Reminder timing</h3>
          <div className="flex flex-wrap gap-2">
            {settings.reminderOptions.map((option) => (
              <button
                key={option}
                type="button"
                disabled={settings.completed}
                onClick={() => setReminderTiming(option)}
                className={`rounded-full px-3 py-1.5 text-[12px] font-medium ${
                  reminderTiming === option
                    ? 'bg-[#1E2124] text-white'
                    : 'border border-[#E6E8EC] bg-white text-[#4B5563]'
                } ${settings.completed ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <SettingsGroup title="Privacy">
          {settings.privacy.map((item) => (
            <SettingsToggleRow
              key={item.id}
              item={item}
              checked={Boolean(toggles[item.id])}
              disabled={settings.completed}
              onToggle={toggle}
            />
          ))}
        </SettingsGroup>
      </div>
    </div>
  )
}

function SettingsGroup({ title, children }) {
  return (
    <section className="space-y-2.5">
      <h3 className="text-[13px] font-semibold text-[#1E2124]">{title}</h3>
      {children}
    </section>
  )
}
