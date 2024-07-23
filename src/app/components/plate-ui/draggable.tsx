"use client";

import React from "react";

import type { DropTargetMonitor } from "react-dnd";

import { cn, withRef } from "@udecode/cn";
import {
  type ClassNames,
  type PlateElementProps,
  type TEditor,
  type TElement,
  useEditorRef,
  useElement,
} from "@udecode/plate-common";
import {
  type DragItemNode,
  useDraggable,
  useDraggableState,
} from "@udecode/plate-dnd";
import { blockSelectionActions } from "@udecode/plate-selection";

import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from "./tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export interface DraggableProps
  extends PlateElementProps,
    ClassNames<{
      /** Block. */
      block: string;

      /** Block and gutter. */
      blockAndGutter: string;

      /** Block toolbar in the gutter. */
      blockToolbar: string;

      /**
       * Block toolbar wrapper in the gutter left. It has the height of a line
       * of the block.
       */
      blockToolbarWrapper: string;

      blockWrapper: string;

      /** Button to dnd the block, in the block toolbar. */
      dragHandle: string;

      /** Icon of the drag button, in the drag icon. */
      dragIcon: string;

      /** Show a dropline above or below the block when dragging a block. */
      dropLine: string;

      /** Gutter at the left side of the editor. It has the height of the block */
      gutterLeft: string;
    }> {
  /**
   * Intercepts the drop handling. If `false` is returned, the default drop
   * behavior is called after. If `true` is returned, the default behavior is
   * not called.
   */
  onDropHandler?: (
    editor: TEditor,
    props: {
      dragItem: DragItemNode;
      id: string;
      monitor: DropTargetMonitor<DragItemNode, unknown>;
      nodeRef: any;
    }
  ) => boolean;
}

const DragHandle = () => {
  const editor = useEditorRef();
  const element = useElement<TElement>();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 text-zinc-500 dark:text-zinc-400"
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();

              // if (element.id) {
              //   blockSelectionActions.addSelectedRow(element.id as string);
              //   blockContextMenuActions.show(editor.id, event as any);
              // }
            }}
            onMouseDown={() => {
              blockSelectionActions.resetSelectedIds();
            }}
          >
            <path
              d="M8 6H8.00635M8 12H8.00635M8 18H8.00635M15.9937 6H16M15.9937 12H16M15.9937 18H16"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>Drag to move</TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  );
};

export const Draggable = withRef<"div", DraggableProps>(
  ({ className, classNames = {}, onDropHandler, ...props }, ref) => {
    const { children, element } = props;

    const state = useDraggableState({ element, onDropHandler });
    const { dropLine, isDragging, isHovered } = state;
    const {
      droplineProps,
      groupProps,
      gutterLeftProps,
      handleRef,
      previewRef,
    } = useDraggable(state);

    return (
      <div
        className={cn(
          "relative",
          isDragging && "opacity-50",
          "group",
          className
        )}
        ref={ref}
        {...groupProps}
      >
        <div
          className={cn(
            "pointer-events-none absolute -top-px z-50 flex h-full -translate-x-full cursor-text opacity-0 group-hover:opacity-100",
            classNames.gutterLeft
          )}
          {...gutterLeftProps}
        >
          <div className={cn("flex h-[1.5em]", classNames.blockToolbarWrapper)}>
            <div
              className={cn(
                "pointer-events-auto mr-1 flex items-center",
                classNames.blockToolbar
              )}
            >
              <div
                className="size-4"
                data-key={element.id as string}
                ref={handleRef}
              >
                {isHovered && <DragHandle />}
              </div>
            </div>
          </div>
        </div>

        <div className={classNames.blockWrapper} ref={previewRef}>
          {children}

          {!!dropLine && (
            <div
              className={cn(
                "absolute inset-x-0 h-0.5 opacity-100",
                "bg-zinc-950 dark:bg-zinc-300",
                dropLine === "top" && "-top-px",
                dropLine === "bottom" && "-bottom-px",
                classNames.dropLine
              )}
              {...droplineProps}
            />
          )}
        </div>
      </div>
    );
  }
);