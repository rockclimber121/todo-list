import React from "react";
import {
    DragSource,
    DragSourceMonitor,
    ConnectDragSource,
    DragSourceConnector,
    DropTargetMonitor,
    DropTarget,
    DropTargetConnector,
    ConnectDropTarget,
    XYCoord,
} from "react-dnd";
import TodoListItem from "./TodoListItem";
import { TodoListItemProps } from "./TodoListItem";

export type OwnProps = {
    onDropped?: () => void;
    onChangeOrder?: (index: number) => void;
    isDragging?: boolean;
    connectDragSource?: ConnectDragSource;
    connectDropTarget?: ConnectDropTarget;
    draggingClassName?: string;
    order: number;
    getNode?: () => HTMLDivElement | null;
};

type Props = OwnProps & TodoListItemProps;

const MobileTodoListItem = ({ ...props }: Props, ref: any) => {
    const { isDragging, connectDragSource, connectDropTarget, draggingClassName } = props;
    const elementRef = React.useRef(null);
    connectDragSource!(elementRef);
    connectDropTarget!(elementRef);

    React.useImperativeHandle<{}, {}>(ref, () => ({
        getNode: () => elementRef.current,
    }));
    return (
        <div ref={elementRef} className={isDragging ? draggingClassName : ""}>
            <TodoListItem {...props} />
        </div>
    );
};

const dragItemType = "TodoListItem";
const dragSource = DragSource(
    dragItemType,
    {
        beginDrag(props: Props): Props {
            return {
                ...props,
                todo: props.todo,
                order: props.order,
            };
        },
        canDrag(props: Props): boolean {
            return !!props.todo;
        },
    },
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }),
);

const dragTarget = DropTarget(
    dragItemType,
    {
        drop(targetProps: Props, monitor: DropTargetMonitor) {
            const currentItem = monitor.getItem() as Props;

            if (currentItem.onDropped) {
                currentItem.onDropped();
            }
        },
        hover(props: Props, monitor: DropTargetMonitor, component: Props) {
            if (!component || !component.getNode) {
                return;
            }

            const componentNode = component.getNode();

            if (!componentNode) {
                return;
            }

            const currentItem = monitor.getItem() as Props;
            const dragIndex = currentItem.order;
            const hoverIndex = props.order;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = componentNode.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (
                (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
                (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
            ) {
                return;
            }

            if (props.onChangeOrder) {
                currentItem.onChangeOrder!(hoverIndex);
                currentItem.order = hoverIndex;
            }
        },
    },
    (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver,
        canDrop: monitor.canDrop,
    }),
);

const MobileTodoListItemWithRef = React.forwardRef<any, Props>(MobileTodoListItem);
export default dragSource(dragTarget(MobileTodoListItemWithRef));
