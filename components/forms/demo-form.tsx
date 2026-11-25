"use client"

import { useId, useState, useTransition } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, CheckCircle2, ChevronDown, Loader2 } from "lucide-react"
import { submitDemoRequest, type DemoRequest } from "@/app/actions/submit-demo"
import { branchOptions, businessTypes, preferredTimes, siteConfig } from "@/src/config/site"
import { demoButtonClass } from "@/components/shared/demo-button"
import { cn } from "@/lib/utils"

type Variant = "full" | "compact"
type Errors = Partial<Record<keyof DemoRequest, string>>

const emptyForm: DemoRequest = {
  name: "",
  businessName: "",
  phone: "",
  businessType: "",
  branches: "",
  preferredTime: "",
}

export const SUCCESS_MESSAGE = "Thanks! We'll call you within 24 hours to confirm your demo."

function validate(values: DemoRequest, variant: Variant): Errors {
  const errors: Errors = {}
  if (values.name.trim().length < 2) errors.name = "Please enter your name"
  
  const digits = values.phone.replace(/\D/g, "")
  if (!digits) {
    errors.phone = "Please enter your phone number"
  } else if (digits.length !== 10) {
    errors.phone = "Please enter a valid 10-digit phone number"
  }

  if (variant === "full") {
    if (values.businessName.trim().length < 2) errors.businessName = "Please enter your business name"
    if (!values.businessType) errors.businessType = "Please choose your business type"
    if (!values.branches) errors.branches = "Please choose number of branches"
    if (!values.preferredTime) errors.preferredTime = "Please choose a preferred time"
  }
  return errors
}

const fieldClass = (hasError: boolean) =>
  cn(
    "h-12 w-full rounded-none border-2 bg-paper px-3.5 text-base text-ink outline-none transition placeholder:text-ink/35 focus:border-forest focus:ring-2 focus:ring-forest/20",
    hasError ? "border-destructive" : "border-ink/30",
  )

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.12em] text-ink/55">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

function SelectField({
  id,
  label,
  value,
  options,
  placeholder,
  error,
  onChange,
}: {
  id: string
  label: string
  value: string
  options: string[]
  placeholder: string
  error?: string
  onChange: (v: string) => void
}) {
  return (
    <Field id={id} label={label} error={error}>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(fieldClass(!!error), "appearance-none pr-10", !value && "text-muted-foreground/70")}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="text-indigo-deep">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      </div>
    </Field>
  )
}

export function DemoForm({ variant = "full", className }: { variant?: Variant; className?: string }) {
  const uid = useId()
  const [values, setValues] = useState<DemoRequest>(emptyForm)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [serverMessage, setServerMessage] = useState("")
  const [pending, startTransition] = useTransition()

  const update = (key: keyof DemoRequest) => (value: string) => {
    let processedValue = value
    if (key === "phone") {
      // Strip out all non-digit characters and limit to 10 digits max
      processedValue = value.replace(/\D/g, "").slice(0, 10)
    }

    setValues((v) => ({ ...v, [key]: processedValue }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const fieldId = (key: keyof DemoRequest) => `${uid}-${key}`

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const found = validate(values, variant)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0] as keyof DemoRequest
      document.getElementById(fieldId(firstKey))?.focus()
      return
    }
    setStatus("idle")
    startTransition(async () => {
      const result = await submitDemoRequest(values, variant)
      if (result.ok) {
        setStatus("success")
        setValues(emptyForm)
      } else {
        setStatus("error")
        setServerMessage(result.message)
      }
    })
  }

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            role="status"
            className="flex flex-col items-center gap-4 bg-paper-light p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 }}
              className="flex size-14 rotate-[-3deg] items-center justify-center border-2 border-forest bg-forest text-paper"
            >
              <CheckCircle2 className="size-7" aria-hidden="true" />
            </motion.div>
            <p className="font-display text-3xl font-extrabold uppercase text-ink">Request received</p>
            <p className="text-muted-foreground">{SUCCESS_MESSAGE}</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-tomato-dark underline underline-offset-4"
            >
              Submit another request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            noValidate
            aria-label="Book a free demo"
            className={cn("flex flex-col gap-4", variant === "compact" && "sm:gap-3")}
          >
            <div className={cn("grid gap-4", variant === "full" ? "sm:grid-cols-2" : "sm:grid-cols-2 sm:gap-3")}>
              <Field id={fieldId("name")} label="Your name" error={errors.name}>
                <input
                  id={fieldId("name")}
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Priya Sharma"
                  value={values.name}
                  onChange={(e) => update("name")(e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? `${fieldId("name")}-error` : undefined}
                  className={fieldClass(!!errors.name)}
                />
              </Field>
              {variant === "full" && (
                <Field id={fieldId("businessName")} label="Business name" error={errors.businessName}>
                  <input
                    id={fieldId("businessName")}
                    type="text"
                    autoComplete="organization"
                    placeholder="e.g. Brew & Bean Café"
                    value={values.businessName}
                    onChange={(e) => update("businessName")(e.target.value)}
                    aria-invalid={!!errors.businessName}
                    aria-describedby={errors.businessName ? `${fieldId("businessName")}-error` : undefined}
                    className={fieldClass(!!errors.businessName)}
                  />
                </Field>
              )}
              <Field id={fieldId("phone")} label="Phone number" error={errors.phone}>
                <input
                  id={fieldId("phone")}
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="tel"
                  placeholder="e.g. 9876543210"
                  value={values.phone}
                  onChange={(e) => update("phone")(e.target.value)}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? `${fieldId("phone")}-error` : undefined}
                  className={fieldClass(!!errors.phone)}
                />
              </Field>
              {variant === "full" && (
                <>
                  <SelectField
                    id={fieldId("businessType")}
                    label="Business type"
                    placeholder="Choose your business"
                    value={values.businessType}
                    options={businessTypes}
                    error={errors.businessType}
                    onChange={update("businessType")}
                  />
                  <SelectField
                    id={fieldId("branches")}
                    label="Number of branches"
                    placeholder="Choose number"
                    value={values.branches}
                    options={branchOptions}
                    error={errors.branches}
                    onChange={update("branches")}
                  />
                  <SelectField
                    id={fieldId("preferredTime")}
                    label="Preferred time for a call"
                    placeholder="Choose a time"
                    value={values.preferredTime}
                    options={preferredTimes}
                    error={errors.preferredTime}
                    onChange={update("preferredTime")}
                  />
                </>
              )}
            </div>

            {status === "error" && (
              <div role="alert" className="flex items-start gap-2 border-2 border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {serverMessage}
              </div>
            )}

            <button type="submit" disabled={pending} className={cn(demoButtonClass("lg"), "w-full")}>
              {pending ? (
                <>
                  <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                siteConfig.ctaLabel
              )}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Free, no obligation. We&apos;ll never share your number.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
