import { useSignal } from "@preact/signals";
import clsx from "clsx";
import type { JSX } from "preact";

type ProductionType = "live" | "recorded";
type Resolution = "SD" | "HD" | "4K";

export default function Calculator({}) {
    const productionType = useSignal<ProductionType>("live");
    const isMultiCamera = useSignal(true);
    const resolution = useSignal<Resolution>("HD");

    return (
        <form data-netlify="true" name="fringe" method="POST">
            <input
                type="hidden"
                name="productionType"
                value={productionType.value}
            />
            <input
                type="hidden"
                name="isMultiCamera"
                value={isMultiCamera.value ? "true" : "false"}
            />
            <input type="hidden" name="resolution" value={resolution.value} />
            <div class="space-y-6 p-8">
                <Field title="Production type">
                    <div class="grid sm:grid-cols-2 gap-4">
                        <Card
                            title="Live"
                            selected={productionType.value == "live"}
                            onClick={() => {
                                productionType.value = "live";
                            }}
                        >
                            Offer remote viewers a live broadcast of your show
                            and sell unlimited virtual tickets. Combine multiple
                            cameras with custom graphics for a cohesive and
                            professional viewing experience. After the show, the
                            individual camera feeds can be re-edited for a
                            picture-perfect final recording.
                        </Card>
                        <Card
                            title="Recorded"
                            selected={productionType.value == "recorded"}
                            onClick={() => {
                                productionType.value = "recorded";
                            }}
                        >
                            With a quick post-production turnaround, we can edit
                            footage from the show and get a finished product
                            back to you within days.
                        </Card>
                    </div>
                </Field>
                <Field title="Angles">
                    <div class="grid sm:grid-cols-2 gap-4">
                        <Card
                            title="Single camera"
                            selected={isMultiCamera.value == false}
                            onClick={() => {
                                isMultiCamera.value = false;
                            }}
                        >
                            One camera, usually recording a static shot from the
                            back of the theatre, is the simplest and cheapest
                            setup for live productions.
                        </Card>
                        <Card
                            title="Multi-camera"
                            selected={isMultiCamera.value == true}
                            onClick={() => {
                                isMultiCamera.value = true;
                            }}
                        >
                            Multiple cameras simultaneously record the show from
                            different angles. Cutting between them not only
                            creates visual interest but allows viewers to see
                            the performance up close.
                        </Card>
                    </div>
                </Field>
                <Field title="Delivery resolution">
                    <div class="grid sm:grid-cols-3 gap-4">
                        <Card
                            title="Standard definition"
                            selected={resolution.value == "SD"}
                            onClick={() => {
                                resolution.value = "SD";
                            }}
                        />
                        <Card
                            title="High definition"
                            selected={resolution.value == "HD"}
                            onClick={() => {
                                resolution.value = "HD";
                            }}
                        />
                        <Card
                            title="4K"
                            selected={resolution.value == "4K"}
                            onClick={() => {
                                resolution.value = "4K";
                            }}
                        ></Card>
                    </div>
                </Field>
            </div>
            <div class="grid sm:grid-cols-2 gap-x-6 gap-y-6 p-8 border-t border-neutral-700">
                <Field title="Name" required>
                    <Input type="text" autoComplete="name" required />
                </Field>
                <Field title="Email" required>
                    <Input type="email" autoComplete="email" required />
                </Field>
                <Field title="Organisation">
                    <Input type="text" autoComplete="organization" />
                </Field>
                <Field title="Job title">
                    <Input type="text" autoComplete="organization-title" />
                </Field>
                <Field
                    title="Dates and times of shows, and other notes"
                    required
                >
                    <TextArea rows={5} required />
                </Field>
                <Field title="What happens next">
                    <p class="leading-normal">
                        Pricing is calculated based on the specification
                        provided here.
                    </p>
                    <p class="mt-2 leading-normal">
                        Shows happening around a similar time benefit from the
                        cost of equipment being split. The more shows and groups
                        that sign up with us, the lower the overall price for
                        everyone. So, please tell your friends about us!
                    </p>
                </Field>
            </div>
            <div class="p-8 border-t border-neutral-700 flex flex-col items-end space-y-5">
                <div data-netlify-recaptcha="true"></div>
                <button
                    class="rounded-lg text-lg font-bold bg-yellow-400 text-black tracking-tighter py-4 px-6 leading-none"
                    type="submit"
                >
                    Submit specification
                </button>
            </div>
        </form>
    );
}

function Field({
    title,
    required,
    children,
}: {
    title: string;
    required?: boolean;
    children: any;
}) {
    return (
        <div>
            <div class="mb-2.5 font-bold">
                {title}
                {required && <span class="text-yellow-400">*</span>}
            </div>
            {children}
        </div>
    );
}

function Card({
    title,
    selected,
    onClick,
    children,
}: {
    title: string;
    selected: boolean;
    onClick: () => void;
    children?: any;
}) {
    return (
        <div
            class={clsx(
                "border rounded-lg transition-colors cursor-pointer hover:bg-neutral-800",
                selected
                    ? "border-yellow-400 bg-neutral-800"
                    : "border-neutral-500"
            )}
            onClick={() => {
                onClick();
            }}
        >
            <div
                class={clsx(
                    "px-4 py-3 transition-colors",
                    selected ? "text-yellow-400" : "text-white"
                )}
            >
                {title}
            </div>
            {children != null && (
                <p
                    class={clsx(
                        "px-4 py-3 text-sm transition-colors leading-normal border-t",
                        selected
                            ? "text-white border-neutral-600"
                            : "text-neutral-300 border-neutral-700"
                    )}
                >
                    {children}
                </p>
            )}
        </div>
    );
}

function Input(props: JSX.HTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            class={clsx(
                props.class,
                "w-full bg-neutral-900 border rounded-lg px-4 py-3 border-neutral-400 outline-none focus:border-yellow-400 focus:bg-neutral-800 hover:bg-neutral-800 transition-colors"
            )}
        />
    );
}

function TextArea(props: JSX.HTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            class={clsx(
                props.class,
                "w-full bg-neutral-900 border rounded-lg px-4 py-3 border-neutral-400 outline-none focus:border-yellow-400 focus:bg-neutral-800 hover:bg-neutral-800 transition-colors"
            )}
        />
    );
}
