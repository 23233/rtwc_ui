import React, {CSSProperties, useEffect, useMemo, useState} from 'react';
import {useForm, RegisterOptions, Controller} from 'react-hook-form';
import {Btn, inputAreaParams, InputAreaView, Spin} from "@rtwc/ui";
import ShowAndEditForNoShow from "../show";

export interface showAndEditBase<t> {
  customValidate?: (newVal: t) => [boolean, string]; // 自定义验证
  onSuccess?: (values: t) => Promise<any> | void
  loading?: boolean
  value?: t
  edit?: boolean
  allowEdit?: boolean
  viewClassName?: string
  viewStyle?: CSSProperties
  validRules?: RegisterOptions
}

export interface showAndEditInputParams extends showAndEditBase<string> {
  textareaAttr?: inputAreaParams
}

const ShowAndEditInput: React.FC<showAndEditInputParams> = ({
                                                              edit = false,
                                                              value = "",
                                                              allowEdit = false,
                                                              textareaAttr,
                                                              loading = false,
                                                              viewClassName = "",
                                                              viewStyle,
                                                              customValidate,
                                                              validRules = {},
                                                              onSuccess
                                                            }) => {
  const [show, setShow] = useState<boolean>(edit);
  const [load, setLoad] = useState<boolean>(false)

  useEffect(() => {
    setLoad(loading)
  }, [loading])

  useEffect(() => {
    if (show !== edit) {
      setShow(edit)
    }
  }, [edit])

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: {errors},
  } = useForm({defaultValues: {val: value}});

  useEffect(() => {
    setValue("val", value)
  }, [value])

  const onSubmit = async (data: any) => {
    if (customValidate) {
      const [pass, msg] = customValidate(data?.val)
      if (!pass) {
        setError("val", {
          message: msg
        })
        return;
      }
    }
    if (onSuccess) {
      setLoad(true)
      try {
        await onSuccess(data?.val)
      } catch (e) {
        console.error("发送变更值返回异常", e)
      } finally {
        setLoad(false)
      }
    }
    setShow(false);

  };

  const editIconClick = () => {
    if (allowEdit) {
      setShow(true);
    }
  };

  const renderNormal = useMemo(() => {
    return (
      <ShowAndEditForNoShow allowEdit={allowEdit}
                            viewClassName={viewClassName}
                            viewStyle={viewStyle}
                            onClick={editIconClick}
                            placeholder={value || textareaAttr?.placeholder}
      />
    )
  }, [value, textareaAttr?.placeholder])


  return <React.Fragment>
    <Spin loading={load} block>
      {
        show ? (
          <React.Fragment>
            <div className={"flex gap-1 "}>
              <div className={"flex-grow"}>
                <Controller
                  control={control}
                  rules={validRules}
                  render={({field: {onChange, onBlur, value}}) => (
                    <InputAreaView
                      {...textareaAttr}
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                  name="val"
                />
              </div>
              <div className={"flex-shrink-0"}>
                <Btn info={"完成"} size={"little"} onClick={handleSubmit(onSubmit)}/>
              </div>
            </div>
            {!!errors?.val &&
              <p className={"text-red-600 font-bold text-sm"}>{errors.val?.message || "验证失败,请重新输入"}</p>}
          </React.Fragment>
        ) : renderNormal


      }
    </Spin>
  </React.Fragment>;
};
export default ShowAndEditInput;
