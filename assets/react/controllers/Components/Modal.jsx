import { Button, Dialog, DialogPanel, DialogTitle, Description, Field, Input, Label } from '@headlessui/react'
import { useState } from 'react'
import clsx from 'clsx'

import fetchBeneficiary from "../utils/fetchBenificiary"



export default function Modal() {
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState("")

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }
    const handleChange = (e)=>{
        setName(e.target.value);
    }
    const handleSubmit = () =>{
        fetchBeneficiary({method: "POST", headers: { "Content-Type": "application/ld+json" }, body: JSON.stringify({"name": name})}, ()=>{
            console.log("ok")
            setName('')
            close()
        }, ()=>{
            console.log('pas ok')
        }, ()=>{
            console.log('error')
        })
    }

    return (
        <>
            <Button
                onClick={open}
                className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-black/30"
            >
                Add Beneficiary
            </Button>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                Add Beneficiary
                            </DialogTitle>
                            <div className="w-full max-w-md px-4">
                                <Field>
                                    <Label className="text-sm/6 font-medium text-white">Name</Label>
                                    <Description className="text-sm/6 text-white/50">Vous pouvez laissez vide le champ 'name'</Description>
                                    <Input
                                        className={clsx(
                                            'mt-2 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                                            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                                        )}
                                        onChange={handleChange}
                                        value={name}
                                    />
                                </Field>
                            </div>
                            <div className="mt-4">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                    onClick={handleSubmit}
                                >
                                    Add
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
