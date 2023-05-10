import { Avatar, Button, FlexChild, FlexLayout, Popover, TextStyles, Topbar } from '@cedcommerce/ounce-ui'
import React, { useState } from 'react'
import { Bell } from "react-feather";


function TopbarComp() {
    const [flag, setFlag] = useState<boolean>(false);
    return (
        <>
            <Topbar
                connectRight={<FlexLayout spacing="loose">
                    <Popover
                        open={flag}
                        activator={
                            <Button
                                onClick={() => setFlag(!flag)}
                                icon={<Bell size={16} />}
                                type="Outlined"
                            />
                        }
                        onClose={() => setFlag(!flag)}
                        popoverContainer="body"
                        popoverWidth={250}
                    >
                        <FlexLayout spacing="loose" wrap="noWrap">
                            <FlexChild>
                                <Avatar
                                    image="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                                    size="medium"
                                />
                            </FlexChild>
                            <FlexChild>
                                <TextStyles>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Est, inventore ipsam maxime nihil, commodi molestias labore
                                    earum blanditiis asperiores quos facere fugiat in sit
                                    nostrum ipsa necessitatibus veritatis sed tenetur.{" "}
                                    <Button
                                        onClick={function noRefCheck() { }}
                                        type="TextButton"
                                    >
                                        Click here
                                    </Button>
                                </TextStyles>
                            </FlexChild>
                        </FlexLayout>
                    </Popover>
                </FlexLayout>}
            />
          
        </>
    )
}

export default TopbarComp