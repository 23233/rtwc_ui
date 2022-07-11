import React, {useRef, useState} from 'react';
import {ShowAndEditInput} from "@rtwc/ui";


const index = (): any => {
  const [show, setShow] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")

  const onSuccessPromise = async (values: string) => {
    return new Promise(((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve("success")
          setValue(values)
        } else {
          reject("fuck")
        }
      }, 2000)
    }))
  }

  return (
    <div>
      <p className={"my-2"}>不允许变更</p>
      <ShowAndEditInput value={value}
                        allowEdit={false}
                        onSuccess={(values => setValue(values))}
      />
      <p className={"my-2"}>基础编辑模式 带验证</p>
      <ShowAndEditInput value={value}
                        allowEdit
                        onSuccess={(values => setValue(values))}
                        validRules={{
                          required: true,
                          minLength: 10,
                        }}

      />

      <p className={"my-2"}>自定义样式 让显示的view和修改的编辑框相同宽度</p>
      <ShowAndEditInput value={value}
                        allowEdit
                        viewClassName={"font-bold"}
                        textareaAttr={{
                          showCount: true,
                          maxValueSize: 200,
                          heightStyle: {
                            minHeight: 24,
                            maxHeight: 100
                          },
                          autoFocus: true,
                        }}
                        onSuccess={(values => setValue(values))}

      />

      <p className={"my-2"}>自定义验证</p>
      <ShowAndEditInput value={value}
                        allowEdit
                        onSuccess={(values => setValue(values))}
                        customValidate={(newVal => {
                          if (newVal.length < 3) {
                            return [false, "请输入大于3个字符"]
                          }
                          return [true, ""]
                        })}

      />

      <p className={"my-2"}>加载中</p>
      <ShowAndEditInput value={value}
                        allowEdit
                        loading={true}
      />

      <p className={"my-2"}>promise success</p>
      <ShowAndEditInput value={value}
                        allowEdit
                        onSuccess={onSuccessPromise}
      />

    </div>
  );
};

export default index;
