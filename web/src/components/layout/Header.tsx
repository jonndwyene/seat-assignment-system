'use client'

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useElementsStore } from "@/features/floorplan-editor/store"
import { useResults } from "@/features/floorplan-output/hooks/useResults"
import { generateOptimalSeatAssignment } from "@/features/floorplan-output/hooks/useRun"
import useAdd from "@/features/student-registry/hooks/useAdd"
import useDataTable from "@/features/student-registry/hooks/useDataTable"
import useUI from "@/hooks/useUI"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"


export default function Header() {
  const { selectedTab, setSelectedTab } = useUI()
  const { present, redo, undo } = useElementsStore()
  const add = useAdd()
  const { results, updateResults } = useResults()
  const { data } = useDataTable()
  return (
    <div className="flex justify-between">
      <Tabs
        value={selectedTab}
        onValueChange={
          (value) => { setSelectedTab(value) }
        }>
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="room">Room</TabsTrigger>
          <TabsTrigger value="output">Results</TabsTrigger>
        </TabsList>
        <TabsContent value="students" className="w-[150%]">
          <Card>
            <CardHeader>
              <CardTitle>Student Register</CardTitle>
              <CardDescription className="whitespace-pre-line text-xs">
                {`Tips:
                - Use the "+" button to register new student.
                - Make sure to fill the following fields.
                - Left the toggle off if not applicable.
                - Click "Run" to generate results.
                `}

              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button className="w-8" variant={'default'} onClick={() => add()}>+</Button>
              <Button
                variant={'outline'}
                className="text-xs"
                onClick={() => {
                  const results = generateOptimalSeatAssignment(data, present)
                  updateResults(results)
                  setSelectedTab('output')
                }}
              >
                Run
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="room" className="w-[160%]">
          <Card>
            <CardHeader>
              <CardTitle>Room</CardTitle>
              <CardDescription className="whitespace-pre-line text-xs">
                {`Tips:
                - Use two fingers to zoom & drag.
                - Click anywhere to add a chair.
                - Click to existing chair to remove it.
                - Use "Undo"/"Redo" to revert to previous actions.
                - Click "Run" to generate results.
                `}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between" >
              <div className="space-x-1">
                <Button
                  variant={'default'}
                  className="text-xs"
                  onClick={() => undo()}
                >
                  Undo
                </Button>
                <Button
                  variant={'default'}
                  className="text-xs"
                  onClick={() => redo()}
                >
                  Redo
                </Button>
              </div>
              <Button
                variant={'outline'}
                className="text-xs"
                onClick={() => {
                  const results = generateOptimalSeatAssignment(data, present)
                  updateResults(results)
                  setSelectedTab('output')
                }}
              >
                Run
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="output" className="w-[125%]">
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription className="whitespace-pre-line text-xs">
                {`This is where generated results may appear.

                Tips:
                - use two fingers to zoom & drag.
                `}

              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                onClick={() => { window.open('https://forms.gle/K43hSXPM4u6hzG5C8', '_blank') }}
              >Answer Survey</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
